import type { Entity } from './Entity'
import {getRoomPath, populateBossRoom, populateRoom3, populateRoom4} from '@/internal/mapLogic/engine/MapUtils.ts'
import { AnimatedObject } from '@/internal/mapLogic/classes/AnimatedObject'
import { NotAnimatedObject } from '@/internal/mapLogic/classes/NotAnimatedObject'
import { loadMapData } from '@/internal/mapLogic/engine/utils/BackgroundLayerUtils.ts'
import { loadMapObjects } from '@/internal/mapLogic/engine/utils/ObjectLayerUtils.ts'
import type { Obj } from './Obj'
import { Vector2 } from './types'
import { Collider } from './collision'
import { Gorg_red } from './Gorg_red'
import boss from '@/components/Canvas.vue'

export class GameHandler {
    player: Entity
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    keys: Set<string>
    bg_image: HTMLImageElement | null
    lastTimeStamp: number
    currentRoomPath: string
    currentBackgroundRoom: any
    currentRoomObjects: Obj[]
    baseMapDim: Vector2 = new Vector2(800, 416)
    gameObjects: Obj[]
    currentRoom: string

    constructor(player: Entity, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.canvas = canvas
        this.player = player
        this.keys = new Set<string>()
        this.lastTimeStamp = 0
        this.player.preloadImages()
        this.player.idle(true)
        this.gameLoop = this.gameLoop.bind(this)
        this.currentRoomPath = ''
        this.currentBackgroundRoom = {}
        this.currentRoomObjects = []
        this.bg_image = null
        this.gameObjects = []
        this.currentRoom = 'room4'

        window.addEventListener('keydown', (e) => {
            e.preventDefault()
            this.keys.add(e.key)
        })

        window.addEventListener('keyup', (e) => {
            e.preventDefault()
            this.keys.delete(e.key)
            if (this.keys.size === 0) this.player.idle()
        })
    }

    gameLoop(timestamp: number) {
        const deltaTime = (timestamp - this.lastTimeStamp) / 1000
        this.lastTimeStamp = timestamp
        if (this.player.mana < this.player.maxMana) {
            this.player.mana = Math.min(
                this.player.maxMana,
                this.player.mana + this.player.manaRegenRate * deltaTime,
            )
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        if (this.bg_image)
            this.ctx.drawImage(this.bg_image, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.restore()
        this.player.handleInput(this.keys, deltaTime)
        Collider.update_collisions(this.gameObjects)
        this.player.attack(this.keys, this.gameObjects)
        this.gameObjects.forEach((obj: Obj) => {
            if (obj.selectedFrames == undefined) {
                return
            }
            obj.update(timestamp, deltaTime)
        })
        requestAnimationFrame(this.gameLoop)
    }

    async initialize() {
        this.currentRoomPath = getRoomPath('boss_room')
        this.bg_image = await loadMapData(this.currentRoomPath, this.canvas, this.ctx)
        this.currentRoomObjects = (await loadMapObjects(
            'boss_room',
            this.currentRoomPath,
            this.canvas,
            this.ctx,
        )) as Obj[]
        // unpack
        /*objs.forEach((obj: Obj) => {
            if (obj.name === 'finalStructure') {
                const accessDoor = obj.custom_properties['accessDoor']
                const ladder = obj.custom_properties['ladder']
                this.currentRoomObjects.push(accessDoor)
                this.currentRoomObjects.push(ladder)
                this.currentRoomObjects.push(obj)
            } else if (obj.name === 'switchStructure') {
                const switchDoor = obj.custom_properties['switchRoomDoor']
                const specialWall = obj.custom_properties['specialWall']
                this.currentRoomObjects.push(switchDoor)
                this.currentRoomObjects.push(specialWall)
                this.currentRoomObjects.push(obj)
            } else {
                this.currentRoomObjects.push(obj)
            }
        })*/

        /*switch (this.currentRoom) {
            case 4:
                populateRoom4(this.currentRoomObjects)
                break

            default:
                break
        }*/
        populateBossRoom(this.currentRoomObjects)
        /*for (const obj of this.currentRoomObjects) {
            console.log("<---------------------------------------------")
            console.log(obj.name)
            console.log(obj.framePaths)
            console.log("--------------------------------------------->")
        }*/
        this.currentRoomObjects.forEach((obj: Obj) => {
            obj.preloadImages()
            obj.idle(true)
        })
        this.currentRoomObjects.sort((a: Obj, b: Obj) => {
            const exotic_peppe = a.name
            if (exotic_peppe === 'structure' && b.name === 'switchRoomDoor') return -1
            if (
                [
                    'entranceDoor',
                    'accessDoor',
                    'ladder',
                    'switchRoomDoor',
                    'specialWall',
                    'structure',
                ].includes(exotic_peppe)
            )
                return 1
            const customA = a.custom_properties
            if (customA['type'] === 'door' || customA['type'] === 'ladder') return 1
            if (customA['type'] === 'brick_wall' || customA['type'] === 'door') return 1
            return -1
        })

        const isBossRoom = ref(true) 
        const boss = ref<any>(null)

        const currentRoom = ref(1)

        const mappedBoss = computed(() => {
            if (!boss.value) return null

            return {
                speed: boss.value.speed,
                health: boss.value.health,
                maxHealth: boss.value.maxHealth,
                mana: boss.value.mana,
                maxMana: boss.value.maxMana,
                level: boss.value.level,
                attackPower: boss.value.attackPower,
                defense: boss.value.defense,
                cooldownQ: boss.value.cooldowns.get(AnimationType.ATTACK_2),
                maxCooldownQ: boss.value.maxCooldownQ,
                cooldownR: boss.value.cooldowns.get(AnimationType.SPECIAL),
                maxCooldownR: boss.value.maxCooldownR,
                position: boss.value.position,
            }
        })

        function initializeBoss() {
            const bossStats = {
                speed: 65,
                health: 1200,
                maxHealth: 1200,
                mana: 800,
                maxMana: 800,
                level: 20,
                attackPower: 120,
                defense: 60,
                cooldowns: new Map([
                    [AnimationType.ATTACK_2, 0],
                    [AnimationType.SPECIAL, 0],
                ]),
                maxCooldownQ: 5,
                maxCooldownR: 10,
                position: { x: 500, y: 200 },
            }
            isBossRoom.value = true
            return bossStats
        }

        this.gameObjects = [...this.currentRoomObjects, this.player, this.boss]
    }
}
