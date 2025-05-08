import {Obj} from '../../../../src/internal/Obj'
import { AnimationType, Vector2 } from '../../../../src/internal/types';
import { AnimatedObject } from '../classes/AnimatedObject';

export class Door extends AnimatedObject {
    constructor(name: string,
                x: number,
                y: number,
                width: number,
                height: number,
                custom_properties: Record<string,string>) {
        super();
                }
        
        /*this.framePaths = {
            run: [],
            attack1: [],
            attack2: [],
            special: [],
            idle: [],
            hurt: [],
            dead: [],
            opening: [
                '../rooms/tiled_objects/apertura.png',
                '../rooms/tiled_objects/apertura1.png',
                '../rooms/tiled_objects/apertura2.png',
                '../rooms/tiled_objects/apertura3.png',
                '../rooms/tiled_objects/apertura4.png',
                '../rooms/tiled_objects/entrance_door.png'
            ],
            closing: [
                '../rooms/tiled_objects/entrance_door.png',
                '../rooms/tiled_objects/apertura4.png',
                '../rooms/tiled_objects/apertura3.png',
                '../rooms/tiled_objects/apertura2.png',
                '../rooms/tiled_objects/apertura1.png',
                '../rooms/tiled_objects/entrance_door.png',
            ]
        }*/
    }