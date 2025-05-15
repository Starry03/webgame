import {NotAnimatedObject} from '../classes/NotAnimatedObject'
import {AnimatedObject} from '../classes/AnimatedObject';
import type {TiledMap, TiledProperty, TiledLayer } from './interfaces/Interfaces';
import {AnimationType, Vector2} from '../../types';
import * as pako from 'pako';

export function loadObjectsFromMap(jsonMap: TiledMap, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): (NotAnimatedObject|AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = [];
    jsonMap.layers.forEach(layer => {
        if (layer.type === 'objects' && layer.objects) {
            layer.objects.forEach(object => {
                const isIdle: boolean = true;
                const pos = new Vector2(object.x, object.y);
                const dim: Vector2 = new Vector2(object.width, object.height);
                if (object.class === 'AnimatedClass') {
                    const custom_properties: Record<string, any> = {} as Record<string, any>;
                    if (object.properties) {
                        object.properties.forEach((property: TiledProperty) => {
                            custom_properties[property.name] = property.value;
                        })
                    }
                    list_objects.push(new AnimatedObject(canvas,ctx,AnimationType.IDLE,isIdle,pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties));
                }
                else {
                    list_objects.push(new NotAnimatedObject(canvas, ctx,AnimationType.IDLE,isIdle,pos, dim, object.name, object.x, object.y, object.width, object.height))
                }
            })
        }
    })
    return list_objects;
}

export async function loadMapObjects(mapUrl: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(AnimatedObject|NotAnimatedObject)[]> {
    try {
        const response = await fetch(mapUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const map_data = await response.json();
        return loadObjectsFromMap(map_data, canvas, ctx);
    }
    catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error);
        return [];
    }
}

const tileSize = 32;
const background_map_image = new Image();
background_map_image.src = '../rooms/background_map/background_map.png';

export function loadImage(img: HTMLImageElement): Promise<void> {
    return new Promise( (resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
    })
}

export async function loadMapData(path: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<void> {
    let map_data: any = null;
    try {
        const res =  await fetch(path);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        map_data = await res.json();

        await loadImage(background_map_image);

        const background_layer = map_data.layers.find((layer: TiledLayer) => layer.name === 'background');
        if (background_layer && background_layer.data) {
            const decoded = decodeTileLayer(background_layer.data);
            drawTileLayer(decoded, background_layer.width, background_layer.height, canvas, ctx);
        }
    }
    catch (err) {
        console.error(err);
        return;
    }
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

export function drawTiles(tileData: number[], width: number, height: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    background_map_image.onload = () => {
        const row_tiles = background_map_image.width /tileSize;

        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const tile_index = row*width + col;
                const gid = tileData[tile_index];
                if (gid === 0) continue;

                const tileX = ((gid-1) % row_tiles)* tileSize;
                const tileY = Math.floor((gid-1) / row_tiles)* tileSize;

                ctx?.drawImage(
                    background_map_image,
                    tileX,
                    tileY,
                    tileSize,
                    tileSize,
                    col*tileSize,
                    row*tileSize,
                    tileSize,
                    tileSize);
            }
        }
    }
}

export function drawTileLayer(tileData: number[], width: number, height: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    if (background_map_image.complete) {
        drawTiles(tileData, width, height, canvas, ctx);
    }
    else {
        background_map_image.onload = () => {
            drawTiles(tileData, width, height, canvas, ctx);
        }
    }

}

const roomsPaths: Record<string, string> = {
    'room1': '../../../public/assets/maps/rooms/room1/room1.json',
    'room2': '../../../public/assets/maps/rooms/room2/room2.json',
    'room3': '../../../public/assets/maps/rooms/room3/room3.json',
    'room4': '../../../public/assets/maps/rooms/room4/room4.json',
    'boss_room': '../../../public/assets/maps/rooms/boss_room/boss_room.json'
};

export async function loadRoomByName(roomName: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    const path = roomsPaths[roomName];
    if (!path) {
        throw new Error(`Room ${roomName} not found`);
    }
    return await loadRoom(path, canvas, ctx);
}

export async function loadRoom(path: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    await loadMapData(path, canvas, ctx);
    return await loadMapObjects(path, canvas, ctx);
}

