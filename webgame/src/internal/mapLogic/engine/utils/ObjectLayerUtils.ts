import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import type { TiledMap, TiledProperty, TiledObject } from '@/internal/mapLogic/engine/interfaces/Interfaces'
import { populateRoom3, populateRoom4 } from '@/internal/mapLogic/engine/MapUtils.ts'
import { EntranceDoor } from '@/internal/mapLogic/objects/door/EntranceDoor'
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor'
import { AccessDoor } from '@/internal/mapLogic/objects/door/AccessDoor'
import { SwitchStructure } from '@/internal/mapLogic/objects/SwitchStructure'
import { SpecialWall } from '@/internal/mapLogic/objects/SpecialWall'
import { FinalStructure } from '@/internal/mapLogic/objects/FinalStructure'
import { Ladder } from '@/internal/mapLogic/objects/Ladder'

export function loadObjectsFromMap(
    jsonMap: TiledMap,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    room_name: string): (NotAnimatedObject | AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = []
    jsonMap.layers.forEach((layer) => {
        if (layer.type === 'objectgroup' && layer.objects) {
            layer.objects.forEach((object) => {
                console.log(object)
                const isIdle: boolean = true
                const pos = new Vector2(object.x, object.y)
                const dim: Vector2 = new Vector2(object.width, object.height)
                if (object.type === 'AnimatedObject') {
                    let custom_properties: Record<string, string>;
                    if (object.name == 'entranceDoor') {
                        custom_properties = extractCustomProperties(object)
                        console.log('loadObjects - entranceDoor')
                        list_objects.push(
                            new EntranceDoor(
                                canvas,
                                ctx,
                                AnimationType.IDLE,
                                isIdle,
                                pos,
                                dim,
                                object.name,
                                object.x,
                                object.y,
                                object.width,
                                object.height,
                                custom_properties,
                            ),
                        )
                    }
                    else if (object.name == 'switchRoomDoor' && !['room3', 'room4'].includes(room_name)) {
                        console.log('loadObjects - switchRoomDoor')
                        custom_properties = extractCustomProperties(object)
                        list_objects.push(
                            new SwitchRoomDoor(
                                canvas,
                                ctx,
                                AnimationType.IDLE,
                                isIdle,
                                pos,
                                dim,
                                object.name,
                                object.x,
                                object.y,
                                object.width,
                                object.height,
                                custom_properties,
                            ),
                        )
                    } else if (object.name == 'switchStructure') {
                        console.log('switchStructure')
                        const special_wall: SpecialWall = SwitchStructure.getSpecialWall(
                            layer.objects,
                            canvas,
                            ctx,
                        )
                        const switch_room_door: SwitchRoomDoor = SwitchStructure.getSwitchRoomDoor(
                            layer.objects,
                            canvas,
                            ctx,
                        )
                        list_objects.push(
                            new SwitchStructure(
                                canvas,
                                ctx,
                                AnimationType.IDLE,
                                isIdle,
                                pos,
                                dim,
                                object.name,
                                object.x,
                                object.y,
                                object.width,
                                object.height,
                                special_wall,
                                switch_room_door,
                            ),
                        )
                    }
                    else if (object.name == 'finalStructure') {
                        console.log('finalStructure')
                        const ladder: Ladder = FinalStructure.getLadder(layer.objects, canvas, ctx)
                        const access_door: AccessDoor = FinalStructure.getAccessDoor(layer.objects, canvas, ctx)
                        return new FinalStructure(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height,ladder, access_door)
                    }
                    else {
                        if (!['specialWall', 'switchRoomDoor', 'accessDoor', 'ladder'].includes(object.name)) {
                            custom_properties = extractCustomProperties(object)
                            list_objects.push(
                                new AnimatedObject(
                                    canvas,
                                    ctx,
                                    AnimationType.IDLE,
                                    isIdle,
                                    pos,
                                    dim,
                                    object.name,
                                    object.x,
                                    object.y,
                                    object.width,
                                    object.height,
                                    custom_properties,
                                ),
                            )
                        }
                    }
                } else {
                    list_objects.push(
                        new NotAnimatedObject(
                            canvas,
                            ctx,
                            AnimationType.IDLE,
                            isIdle,
                            pos,
                            dim,
                            object.name,
                            object.x,
                            object.y,
                            object.width,
                            object.height,
                        ),
                    )
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
        const list_objects: (NotAnimatedObject | AnimatedObject)[] = loadObjectsFromMap(map_data, canvas, ctx, 'room4')
        populateRoom4(list_objects)
        return list_objects
    }
    catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error)
        return []
    }
}

export function extractCustomProperties(object: TiledObject): Record<string, string> {
    const custom_properties: Record<string, any> = {} as Record<string, any>
    if (object.properties) {
        object.properties.forEach((property: TiledProperty) => {
            custom_properties[property.name] = property.value
        })
    }
    return custom_properties
}
