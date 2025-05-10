import {NotAnimatedObject} from '../classes/NotAnimatedObject'
import {AnimatedObject} from '../classes/AnimatedObject';
import {TiledMap } from './interfaces/Interfaces';
import {AnimationType, Vector2} from '../../../../src/internal/types';


export function loadObjectsFromMap(jsonMap: TiledMap): (NotAnimatedObject|AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = [];
    jsonMap.layers.forEach(layer => {
        if (layer.type === 'objects' && layer.objects) {
            layer.objects.forEach(object => {
                const canvas = new HTMLCanvasElement();
                const ctx = new CanvasRenderingContext2D();
                const isIdle: boolean = true;
                const pos = new Vector2(object.x, object.y);
                const dim: Vector2 = new Vector2(object.width, object.height);
                if (object.class === 'Animated') {
                    const custom_properties: Record<string, any> = {} as Record<string, any>;
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
