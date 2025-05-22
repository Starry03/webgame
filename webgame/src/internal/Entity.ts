import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'
import { type Ref, ref } from 'vue'

export class Entity extends Obj {
    speed: number
    health: number
    maxHealth: number
    mana: number
    maxMana: number
    maxCooldownE: number
    maxCooldownQ: number
    maxCooldownR: number

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        speed: number,
        health: number,
        mana: number,
        pos: Vector2 = new Vector2(50, 50),
        dim: Vector2 = new Vector2(48, 48),
    ) {
        super(canvas, ctx, AnimationType.IDLE, true, pos, dim, { collidable: true }, 'player')
        this.currentAnimation = AnimationType.IDLE
        this.speed = speed
        this.health = health
        this.maxHealth = health
        this.mana = mana
        this.maxMana = mana
        this.cooldowns.set(AnimationType.ATTACK_1, ref(0))
        this.cooldowns.set(AnimationType.ATTACK_2, ref(0))
        this.cooldowns.set(AnimationType.SPECIAL, ref(0))
        this.maxCooldownE = this.speed * 10
        this.maxCooldownQ = this.speed * 10 * 2.5
        this.maxCooldownR = this.speed * 10 * 5
    }

    handleInput(keys: Set<string>, deltaTime: number) {
        this.move(keys, deltaTime)
        this.attack(keys)
    }

    move(keys: Set<string>, deltaTime: number) {
        if (this.isAnimationBlocking) return
        let dir = new Vector2(
            (keys.has('d') || keys.has('ArrowRight') ? 1 : 0) +
                (keys.has('a') || keys.has('ArrowLeft') ? -1 : 0),
            (keys.has('s') || keys.has('ArrowDown') ? 1 : 0) +
                (keys.has('w') || keys.has('ArrowUp') ? -1 : 0),
        )

        dir.normalize()
        if (dir.compare(0, 0)) {
            this.idle()
            return
        }

        const possible_position = new Vector2(
            this.pos.x + dir.x * this.speed * deltaTime * 4,
            this.pos.y + dir.y * this.speed * deltaTime * 4,
        )

        if (!dir.direction().compare(0, 0) && !this.canMove(possible_position, dir)) {
            return
        }

        this.pos = possible_position
        this.changeAnimation(AnimationType.RUN)
        this.facingDirection = dir
    }

    get_damage(damage: number) {
        this.health -= damage
        if (this.health <= 0) {
            this.health = 0
            this.die()
        }
    }

    die() {}

    attack(keys: Set<string>) {
        let isAttacking: boolean = true
        let cooldownFactor: number = 1
        let attackFactor: number = 1
        let usedAnimation: AnimationType = AnimationType.IDLE

        if (keys.has('e') && this.cooldowns.get(AnimationType.ATTACK_1)?.value == 0) {
            this.changeAnimation(AnimationType.ATTACK_1, true)
            usedAnimation = AnimationType.ATTACK_1
            cooldownFactor = 1
        } else if (keys.has('q') && this.cooldowns.get(AnimationType.ATTACK_2)?.value == 0) {
            this.changeAnimation(AnimationType.ATTACK_2, true)
            usedAnimation = AnimationType.ATTACK_2
            cooldownFactor = 2.5
        } else if (keys.has('r') && this.cooldowns.get(AnimationType.SPECIAL)?.value == 0) {
            this.changeAnimation(AnimationType.SPECIAL, true)
            usedAnimation = AnimationType.SPECIAL
            cooldownFactor = 5
        } else isAttacking = false
        if (!isAttacking) return

        attackFactor = cooldownFactor
        let refCooldown: Ref<number> | undefined = this.cooldowns.get(usedAnimation)
        if (!refCooldown) return

        refCooldown.value = this.speed * 10 * cooldownFactor

        const intervalId = setInterval(() => {
            if (refCooldown.value > 0) {
                refCooldown.value *= 0.9
            }
        }, 100)

        setTimeout(
            () => {
                refCooldown.value = 0
                clearInterval(intervalId)
            },
            this.speed * 10 * cooldownFactor,
        )
    }
    handleAttack() {}
}
