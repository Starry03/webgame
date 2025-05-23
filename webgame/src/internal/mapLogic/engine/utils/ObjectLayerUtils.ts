import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import type {
    TiledMap,
    TiledObject,
    TiledProperty,
} from '@/internal/mapLogic/engine/interfaces/Interfaces'
import { populateRoom4 } from '@/internal/mapLogic/engine/MapUtils.ts'
import { EntranceDoor } from '@/internal/mapLogic/objects/door/EntranceDoor'
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor'
import { SwitchEntrance } from '@/internal/mapLogic/objects/SwitchEntrance'
import { AccessDoor } from '@/internal/mapLogic/objects/door/AccessDoor'

export function loadObjectsFromMap(
    jsonMap: TiledMap,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    room_name: string,
): (NotAnimatedObject | AnimatedObject)[] {
    const list_objects: (NotAnimatedObject | AnimatedObject)[] = []
    const all_tiledObjects: TiledObject[] = []
    jsonMap.layers.forEach((layer) => {
        if (layer.type === 'objectgroup' && layer.objects) {
            layer.objects.forEach((object: TiledObject) => {
                all_tiledObjects.push(object)
            })
        }
    })
    for (const object of all_tiledObjects) {
        object.y = object.y - object.height
        const isIdle: boolean = true
        const pos = new Vector2(object.x, object.y)
        const dim: Vector2 = new Vector2(object.width, object.height)
        if (object.type === 'AnimatedObject') {
            let custom_properties: Record<string, string>
            if (object.name == 'entranceDoor') {
                custom_properties = extractCustomProperties(object)

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
            // prima della modifica: else if (object.name == 'switchRoomDoor' && !(room_name !== 'room3')) {
            else if (object.name == 'switchRoomDoor') {
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
            } else if (object.name == 'switchEntrance') {
                custom_properties = extractCustomProperties(object)
                const switchEntrance: SwitchEntrance = new SwitchEntrance(
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
                )
                switchEntrance.setPaths()
                list_objects.push(switchEntrance)
            }
            else if (object.name == 'accessDoor') {
                custom_properties = extractCustomProperties(object)
                const accessDoor: AccessDoor = new AccessDoor(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties);
                accessDoor.setPaths()
                list_objects.push(accessDoor)
            }
            else {
                if (
                    !['specialWall', 'switchRoomDoor', 'accessDoor'].includes(object.name)
                ) {
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
                    {},
                ),
            )
        }
    }
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
        const list_objects: (NotAnimatedObject | AnimatedObject)[] = loadObjectsFromMap(
            map_data,
            canvas,
            ctx,
            'room4',
        )
        populateRoom4(list_objects)
        return list_objects
    } catch (error) {
        console.error(`Errore nel caricamento della mappa: ${mapUrl}`, error)
        return []
    }
}

export function extractCustomProperties(object: TiledObject): Record<string, any> {
    const custom_properties: Record<string, any> = {} as Record<string, any>
    if (object.properties) {
        object.properties.forEach((property: TiledProperty) => {
            custom_properties[property.name] = property.value
        })
    }
    return custom_properties
}
