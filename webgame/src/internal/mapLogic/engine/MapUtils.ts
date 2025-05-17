import {NotAnimatedObject} from '../classes/NotAnimatedObject'
import {AnimatedObject} from '../classes/AnimatedObject';
import {AnimationType, Vector2} from '../../types';
import * as pako from 'pako';

export function getRoomPath(room: string): string {
    if (room == 'room1') {
        return '/assets/maps/rooms/room1/room1.json';
    }
    else if (room == 'room2') {
        return '/assets/maps/rooms/room2/room2.json';
    }
    else if (room == 'room3') {
        return '/assets/maps/rooms/room3/room3.json';
    }
    else if (room == 'room4') {
        return '/assets/maps/rooms/room4/room4.json';
    }
    else if (room == 'boss_room') {
        return '/assets/maps/rooms/boss_room/boss_room.json';
    }
    else {
        throw new Error('Unknown room');
    }
}

const IMAGES_PATHS: Record<string, string> = {
    'rock1': '/assets/maps/rooms/tiled_objects/rocks/rock1.png',
    'rock2': '/assets/maps/rooms/tiled_objects/rocks/rock2.png',
    'rock3':  '/assets/maps/rooms/tiled_objects/rocks/rock3.png',
    'rock4':  '/assets/maps/rooms/tiled_objects/rocks/rock4.png',
    'crystal3': '/assets/maps/rooms/tiled_objects/crystals/crystals3.png',
    'crystal4': '/assets/maps/rooms/tiled_objects/crystals/crystals4.png',
    'crystal5': '/assets/maps/rooms/tiled_objects/crystals/crystals5.png',
    'crystal6': '/assets/maps/rooms/tiled_objects/crystals/crystals6.png',
    'crystal7': '/assets/maps/rooms/tiled_objects/crystals/crystals7.png',
    'crystal8': '/assets/maps/rooms/tiled_objects/crystals/crystals8.png',
    'structure': '/assets/maps/rooms/tiled_objects/structure.png',
    'bat': '/assets/maps/rooms/tiled_objects/bat.png',
    'manaPotion':  '/assets/maps/rooms/tiled_objects/mana_potion.png',
    'hpPotion':   '/assets/maps/rooms/tiled_objects/hp_potion.png',
    'attackEnhancement': '/assets/maps/rooms/tiled_objects/attack_enchantment.png',
    'defenseEnhancement': '/assets/maps/rooms/tiled_objects/defense_enhancement.png',
}

/*export async function loadRoomByName(roomName: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(NotAnimatedObject|AnimatedObject)[]> {
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

export function populateRoom1(list_objects: (NotAnimatedObject|AnimatedObject)[]) {
    for (const obj of list_objects) {
        let frame_paths: Record<AnimationType, string[]>;
        if (['rock14', 'rock15', 'rock16', 'rock17' ].includes(obj.name) ) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock1']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock1', 'rock2'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock2']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock3', 'rock4', 'rock5', 'rock6'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock4']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock7', 'rock8',  'rock9', 'rock10', 'rock11', 'rock12', 'rock13'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock3']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'crystal3') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal3']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'crystal1') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal4']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'crystal2') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal5']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal4', 'crystal5'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal8']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal8', 'crystal9'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal6']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal6', 'crystal7'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal7']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'structure') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['structure']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'bat') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['bat']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        /*else {
            console.log(obj.name);
            throw new Error('path not found');
            return;
        }*/
    }
}

export function populateRoom2 (tiled_objects: (NotAnimatedObject|AnimatedObject)[]) {
    for (const obj of tiled_objects) {
        let frame_paths: Record<AnimationType, string[]>;
        if (['rock6', 'rock14'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock1']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock4', 'rock8', 'rock9', 'rock10'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock2']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock1', 'rock5', 'rock11'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock3']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['rock2', 'rock3', 'rock7', 'rock12', 'rock13'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['rock4']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal2', 'crystal8'].includes(obj.name)) {
                frame_paths = {
                    run: [],
                    attack1: [],
                    attack2: [],
                    special: [],
                    idle: [IMAGES_PATHS['crystal3']],
                    hurt: [],
                    dead: [],
                    opening: [],
                    closing: []
                }
                obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'crystal6') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal4']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal7', 'crystal12'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal5']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal4', 'crystal5', 'crystal11'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal6']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'crystal9') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal7']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (['crystal1', 'crystal3', 'crystal10'].includes(obj.name)) {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['crystal8']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'structure') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['structure']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'bat') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['bat']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'manaPotion') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['manaPotion']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'hpPotion') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['hpPotion']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'attackEnhancement') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['attackEnhancement']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        else if (obj.name == 'defenseEnhancement') {
            frame_paths = {
                run: [],
                attack1: [],
                attack2: [],
                special: [],
                idle: [IMAGES_PATHS['defenseEnhancement']],
                hurt: [],
                dead: [],
                opening: [],
                closing: []
            }
            obj.setFramePaths(frame_paths);
        }
        console.log(obj.name);
        /*else {
            console.log(obj.name);
            throw new Error('path not found');
            return;
        }*/
    }
}

