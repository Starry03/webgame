import {NotAnimatedObject} from '../classes/NotAnimatedObject'
import {AnimatedObject} from '../classes/AnimatedObject';
import type {TiledMap, TiledProperty, TiledLayer } from './interfaces/Interfaces';
import {AnimationType, Vector2} from '../../types';
import {loadMapData} from './utils/BackgroundLayerUtils'
import * as pako from 'pako';

export function getRoomPath(room: string): string {
    if (room == 'room1') {
        return '/assets/maps/rooms/room1/room1.json';
    }
    else if (room == 'room2') {
        return '/assets/maps/rooms/rooms/room2.json';
    }
    else if (room == 'room3') {
        return '/assets/maps/rooms/rooms/room3.json';
    }
    else if (room == 'room4') {
        return '/assets/maps/rooms/rooms/room4.json';
    }
    else if (room == 'boss_room') {
        return '/assets/maps/rooms/boss_room/boss_room.json';
    }
    else {
        throw new Error('Unknown room');
    }
}

/*const roomsPaths: Record<string, string> = {
    'room1': '/assets/maps/rooms/room1/room1.json',
    'room2': '/assets/maps/rooms/room2/room2.json',
    'room3': '/assets/maps/rooms/room3/room3.json',
    'room4': '/assets/maps/rooms/room4/room4.json',
    'boss_room': '/assets/maps/rooms/boss_room/boss_room.json'
};

export async function loadRoomByName(roomName: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    const path = roomsPaths[roomName];
    if (!path) {
        throw new Error(`Room ${roomName} not found`);
    }
    return await loadRoom(path, canvas, ctx);
}

export async function loadRoom(path: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(NotAnimatedObject|AnimatedObject)[]> {
    console.log("caricamento livello di background")
    await loadMapData(path, canvas, ctx);
    console.log("caricamento livello oggetto")
    return await loadMapObjects(path, canvas, ctx);
}*/

