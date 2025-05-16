import {NotAnimatedObject} from '../../classes/NotAnimatedObject'
import {AnimatedObject} from '../../classes/AnimatedObject';
import type {TiledMap, TiledProperty, TiledLayer } from '../interfaces/Interfaces';
import {AnimationType, Vector2} from '../../../types';
import * as pako from 'pako';

const tileSize = 32;

export function loadImage(): Promise<HTMLImageElement> {
    const background_map_image = new Image()
    background_map_image.src = '/assets/maps/rooms/background_map/background_map.png';

    return new Promise( (resolve, reject) => {
        background_map_image.onload = () => {
            console.log('Loaded image');
            return background_map_image;
        }
        background_map_image.onerror = (err) => {
            console.log('Error during loading image', err);
            reject(err)
        }
    })
}

export async function loadMapData(path: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<{}> {
    console.log("loadMapData(): begin")
    let results = {}
    let map_data: any = null;
    try {
        console.log("dentro il try")
        const res =  await fetch(path);
        console.log("dopo fetch(path)")
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        map_data = await res.json();
        console.log("popolazione di map_data avvenuta con successo!")
        const image = await loadImage();
        console.log("caricamento immagine di background avvenuta con successo!")
        const background_layer = map_data.layers.find((layer: TiledLayer) => layer.name === 'background');
        if (background_layer && background_layer.data) {
            const decoded = decodeTileLayer(background_layer.data);

            results = drawTileLayer(decoded, background_layer.width, background_layer.height, canvas, ctx, image);
        }
    }
    catch (err) {
        console.error(err);
        return {};
    }
    console.log("loadMapData(): end")
    return results;
}

export function decodeTileLayer(encoded_data: string): number[] {
    const binary = atob(encoded_data);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    //utilizzo della libreria pako
    const decompressed = pako.inflate(bytes);
    const tileData: number[] = [];

    //ogni tile occupa 4 byte
    for (let i = 0; i < decompressed.length; i+= 4) {
        const tileID = decompressed[i] |
            (decompressed[i+1] << 8) |
            (decompressed[i+2] << 16)|
            (decompressed[i+3] << 24);
        tileData.push(tileID);
    }

    return tileData;
}

export function drawTiles(background_map_image: HTMLImageElement, tileData: number[], width: number, height: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    background_map_image.onload = () => {
        const row_tiles = background_map_image.width /tileSize;

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const tile_index = row*width + col;
                const gid = tileData[tile_index];
                if (gid === 0) continue;

                const tileX = ((gid-1) % row_tiles)* tileSize;
                const tileY = Math.floor((gid-1) / row_tiles)* tileSize;
                try {
                    ctx?.drawImage(
                        background_map_image,
                        tileX,
                        tileY,
                        tileSize,
                        tileSize,
                        col * tileSize,
                        row * tileSize,
                        tileSize,
                        tileSize);
                }
                catch (error) {
                    console.error("catch error ctx", error);
                }
            }
        }
    }
    return {
        "image": background_map_image,
        "tile_data": tileData,
        "width": width,
        "height": height,
    }
}

export function drawTileLayer(tileData: number[], width: number, height: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, background_map_image: HTMLImageElement): JSON {
    let result = {};
    if (background_map_image.complete) {
        result = drawTiles(background_map_image, tileData, width, height, canvas, ctx);
    }
    else {
        background_map_image.onload = () => {
            result = drawTiles(background_map_image, tileData, width, height, canvas, ctx);
        }
    }
    return <JSON>result;
}
