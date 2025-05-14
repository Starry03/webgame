import {NotAnimatedObject} from '../classes/NotAnimatedObject'
import {AnimatedObject} from '../classes/AnimatedObject';
import {TiledMap, TiledProperty } from './interfaces/Interfaces';
import {AnimationType, Vector2} from '../../../../src/internal/types';
import * as pako from 'pako';


export function loadObjectsFromMap(jsonMap: TiledMap): (NotAnimatedObject|AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = [];
    jsonMap.layers.forEach(layer => {
        if (layer.type === 'objects' && layer.objects) {
            layer.objects.forEach(object => {
                /*verificare se "canvas" e "ctx" sono corretti: le alternative sono:
                * const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');*/
                const canvas = new HTMLCanvasElement();
                const ctx = new CanvasRenderingContext2D();
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

export async function loadMapObjects(mapUrl: string): Promise<(AnimatedObject|NotAnimatedObject)[]> {
    try {
        const response = await fetch(mapUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const map_data = await response.json();
        return loadObjectsFromMap(map_data);
    }
    catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error);
        return [];
    }
}

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const tileSize = 32;
const background_map_image = new Image();
background_map_image.src = '../rooms/background_map/background_map.png';

function loadImage(img: HTMLImageElement): Promise<void> {
    return new Promise( (resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
    })
}

export async function loadMapData(path: string): Promise<void> {
    let map_data: any = null;
    try {
        const res =  await fetch(path);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        map_data = await res.json();

        await loadImage(background_map_image);

        const background_layer = map_data.layers.find(layer => layer.name === 'background');
        if (background_layer && background_layer.data) {
            const decoded = decodeTileLayer(background_layer.data);
            drawTileLayer(decoded, background_layer.width, background_layer.height);
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

export function drawTileLayer(tileData: number[], width: number, height: number) {
    background_map_image.onload = () => {
       const row_tiles = background_map_image.width /tileSize;

       for (let row = 0; row < height; row++) {
           for (let col = 0; col < width; col++) {
               const tile_index = row*width + col;
               const gid = tileData[tile_index];
               if (gid === 0) continue;

               const tileX = ((gid-1) % row_tiles)* tileSize;
               const tileY = Math.floor((gid-1) / row_tiles)* tileSize;

               ctx.drawImage(
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

const roomsPaths: Record<string, string> = {
    'room1': '../../rooms/room1/rooms1.json',
    'room2': '../../rooms/room2/rooms2.json',
    'room3': '../../rooms/room3/rooms3.json',
    'room4': '../../rooms/room4/rooms4.json',
    'boss_room': '../../rooms/boss_room/boss_room.json',
};

export async function loadRoomByName(roomName: string): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    const path = roomsPaths[roomName];
    if (!path) {
        throw new Error(`Room ${roomName} not found`);
    }
    return await loadRoom(path);
}

export async function loadRoom(path: string): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    await loadMapData(path);
    return await loadMapObjects(path);
}

