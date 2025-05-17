import {NotAnimatedObject} from '../../classes/NotAnimatedObject'
import {AnimatedObject} from '../../classes/AnimatedObject';
import {AnimationType, Vector2} from '../../../types';
import type { TiledMap, TiledProperty } from '../interfaces/Interfaces'
import {populateRoom1, populateRoom2, populateRoom3} from '@/internal/mapLogic/engine/MapUtils.ts'

export function loadObjectsFromMap(jsonMap: TiledMap, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): (NotAnimatedObject|AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = [];
    jsonMap.layers.forEach(layer => {
        if (layer.type === 'objectgroup' && layer.objects) {
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

export async function loadMapObjects(room_name: string, mapUrl: string, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<(AnimatedObject|NotAnimatedObject)[]> {
    try {
        const response = await fetch(mapUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const map_data: TiledMap = await response.json();
        const list_objects: (NotAnimatedObject|AnimatedObject)[] = loadObjectsFromMap(map_data, canvas, ctx);
        populateRoom3(list_objects);
        return list_objects;
    }
    catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error);
        return [];
    }
}
