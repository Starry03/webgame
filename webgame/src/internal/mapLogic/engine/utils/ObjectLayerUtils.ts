import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import {AnimationType, Vector2} from '@/internal/types.ts'
import type {TiledMap, TiledProperty} from '@/internal/mapLogic/engine/interfaces/Interfaces'
import { populateRoom1, populateBossRoom } from '@/internal/mapLogic/engine/MapUtils.ts'
import {EntranceDoor} from '@/internal/mapLogic/objects/door/EntranceDoor'
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor'
import {AccessDoor} from '@/internal/mapLogic/objects/door/AccessDoor'

export function loadObjectsFromMap(jsonMap: TiledMap, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): (NotAnimatedObject | AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = []
    jsonMap.layers.forEach((layer) => {
        if (layer.type === 'objectgroup' && layer.objects) {
            layer.objects.forEach((object) => {
                console.log(object)
                const isIdle: boolean = true
                const pos = new Vector2(object.x, object.y)
                const dim: Vector2 = new Vector2(object.width, object.height)
                if (object.type === 'AnimatedObject') {
                    console.log("AnimatedObject")
                    const custom_properties: Record<string, any> = {} as Record<string, any>
                    if (object.properties) {
                        object.properties.forEach((property: TiledProperty) => {
                            custom_properties[property.name] = property.value
                        })
                    }
                    console.log("loadObject - AnimatedClass")
                    if (object.name == 'entranceDoor') {
                        console.log("loadObjects - entranceDoor");
                        list_objects.push(new EntranceDoor(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties))
                    }
                    else if (object.name == 'switchRoomDoor') {
                        console.log("loadObjects - switchRoomDoor");
                        list_objects.push(new SwitchRoomDoor(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties))
                    }
                    else if (object.name == 'accessDoor') {
                        console.log("loadObjects - accessDoor");
                        list_objects.push(new AccessDoor(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties))
                    }
                    else {
                        list_objects.push(new AnimatedObject(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties))
                    }
                }
                else {
                    list_objects.push(new NotAnimatedObject(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height))
                }
            })
        }
    })
    return list_objects
}

export async function loadMapObjects(
    room_name: string,
    mapUrl: string,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
): Promise<(AnimatedObject | NotAnimatedObject)[]> {
    try {
        const response = await fetch(mapUrl)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const map_data: TiledMap = await response.json()
        const list_objects: (NotAnimatedObject | AnimatedObject)[] = loadObjectsFromMap(map_data, canvas, ctx);
        populateRoom1(list_objects);
        return list_objects
    } catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error)
        return []
    }
}
