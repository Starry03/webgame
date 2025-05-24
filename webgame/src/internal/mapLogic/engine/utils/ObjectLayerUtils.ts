import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { AnimationType, Vector2 } from '@/internal/types.ts'
import type {
    TiledMap,
    TiledObject,
    TiledProperty,
} from '@/internal/mapLogic/engine/interfaces/Interfaces'
import {
    populateBossRoom,
    populateRoom1,
    populateRoom2,
    populateRoom3,
    populateRoom4,
} from '@/internal/mapLogic/engine/MapUtils.ts'
import { EntranceDoor } from '@/internal/mapLogic/objects/door/EntranceDoor'
import { SwitchRoomDoor } from '@/internal/mapLogic/objects/door/SwitchRoomDoor'
import { SwitchEntrance } from '@/internal/mapLogic/objects/SwitchEntrance'
import { AccessDoor } from '@/internal/mapLogic/objects/door/AccessDoor'
import { Ladder } from '@/internal/mapLogic/objects/ladder/Ladder.ts'
import { AttackEnhancement } from '@/internal/mapLogic/objects/enhancements/AttackEnhancement'
import { DefenseEnhancement } from '@/internal/mapLogic/objects/enhancements/DefenseEnhancement'
import { ManaPotion } from '@/internal/mapLogic/objects/potions/ManaPotion'
import { HpPotion } from '@/internal/mapLogic/objects/potions/HpPotion'
import { BossLadder } from '@/internal/mapLogic/objects/ladder/BossLadder'
import { BossRock } from '@/internal/mapLogic/objects/BossRock'

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
                const entranceDoor: EntranceDoor = new EntranceDoor(
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
                entranceDoor.setPaths()
                list_objects.push(entranceDoor)
            } else if (object.name == 'switchRoomDoor') {
                custom_properties = extractCustomProperties(object)
                const switchRoomDoor: SwitchRoomDoor = new SwitchRoomDoor(
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
                switchRoomDoor.setPaths()
                list_objects.push(switchRoomDoor)
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
            } else if (object.name == 'accessDoor') {
                custom_properties = extractCustomProperties(object)
                const accessDoor: AccessDoor = new AccessDoor(
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
                accessDoor.setPaths()
                list_objects.push(accessDoor)
            } else if (object.name == 'ladder') {
                custom_properties = extractCustomProperties(object)
                const ladder: Ladder = new Ladder(
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
                list_objects.push(ladder)
            } else if (object.name == 'bossLadder') {
                custom_properties = extractCustomProperties(object)
                const bossLadder: BossLadder = new BossLadder(
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
                list_objects.push(bossLadder)
            } else if (object.name == 'attackEnhancement') {
                custom_properties = extractCustomProperties(object)
                const attackEnhancement: AttackEnhancement = new AttackEnhancement(
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
                list_objects.push(attackEnhancement)
            } else if (object.name == 'defenseEnhancement') {
                custom_properties = extractCustomProperties(object)
                const defenseEnhancement: DefenseEnhancement = new DefenseEnhancement(
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
                list_objects.push(defenseEnhancement)
            } else if (object.name == 'manaPotion') {
                custom_properties = extractCustomProperties(object)
                const manaPotion: ManaPotion = new ManaPotion(
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
                list_objects.push(manaPotion)
            } else if (object.name == 'hpPotion') {
                custom_properties = extractCustomProperties(object)
                const hpPotion: HpPotion = new HpPotion(
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
                list_objects.push(hpPotion)
            } else if (object.name == 'bossRock') {
                custom_properties = extractCustomProperties(object)
                const bossRock: BossRock = new BossRock(canvas, ctx, AnimationType.IDLE, isIdle, pos, dim, object.name, object.x, object.y, object.width, object.height, custom_properties)
                list_objects.push(bossRock)
            } else {
                if (!['specialWall', 'switchRoomDoor', 'accessDoor'].includes(object.name)) {
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
            room_name,
        )
        switch (room_name) {
            case 'room1':
                populateRoom1(list_objects)
                break
            case 'room2':
                populateRoom2(list_objects)
                break
            case 'room3':
                populateRoom3(list_objects)
                break
            case 'room4':
                populateRoom4(list_objects)
                break
            case 'boss_room':
                populateBossRoom(list_objects)
            default:
                break
        }
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
