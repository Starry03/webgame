import { AnimationType, Vector2 } from './types'
import { Obj } from './Obj'
import { type Ref, ref } from 'vue'

export class Entity extends Obj {
    speed: number
    health: number
    maxHealth: number
    mana: number
    maxMana: number
    manaRegenRate: number = 20
    attackPower: number
    defense: number
    maxCooldownE: number
    maxCooldownQ: number
    maxCooldownR: number
    level: number
    isDead: boolean

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        speed: number,
        health: number,
        mana: number,
        attackPower: number,
        defense: number,
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
        this.attackPower = attackPower
        this.defense = defense
        this.cooldowns.set(AnimationType.ATTACK_1, ref(0))
        this.cooldowns.set(AnimationType.ATTACK_2, ref(0))
        this.cooldowns.set(AnimationType.SPECIAL, ref(0))
        this.maxCooldownE = this.speed * 10
        this.maxCooldownQ = this.speed * 10 * 2.5
        this.maxCooldownR = this.speed * 10 * 5
        this.level = 1
        this.isDead = false
    }

    consumeMana(amount: number): boolean {
        if (this.mana < amount) return false
        this.mana -= amount
        return true
    }

    handleInput(keys: Set<string>, deltaTime: number) {
        this.move(keys, deltaTime)
    }

    getPossiblePosition(dir: Vector2, deltaTime: number): Vector2 {
        return new Vector2(
            this.pos.x + dir.x * this.speed * deltaTime * 4,
            this.pos.y + dir.y * this.speed * deltaTime * 4,
        )
    }

    turn(dir: Vector2) {
        this.facingDirection = dir
    }

    move(keys: Set<string>, deltaTime: number, getPossiblePosition: boolean = false) {
        if (this.isAnimationBlocking) return null
        let dir = new Vector2(
            (keys.has('d') || keys.has('ArrowRight') ? 1 : 0) +
                (keys.has('a') || keys.has('ArrowLeft') ? -1 : 0),
            (keys.has('s') || keys.has('ArrowDown') ? 1 : 0) +
                (keys.has('w') || keys.has('ArrowUp') ? -1 : 0),
        )

        dir.normalize()
        if (dir.compare(0, 0)) {
            this.idle()
            return null
        }

        const abs_dir = dir.direction()
        this.turn(new Vector2(abs_dir.x, 0))

        const possible_position = this.getPossiblePosition(dir, deltaTime)
        if (getPossiblePosition) return { possible_position, dir }

        if (!dir.direction().compare(0, 0) && !this.canMove(possible_position, dir)) {
            return null
        }

        this.pos = possible_position
        this.changeAnimation(AnimationType.RUN)
        this.facingDirection = dir
        return null
    }

    get_damage(damage: number) {
        this.health -= damage
        if (this.health <= 0) {
            this.health = 0
            this.die()
        }
        console.log(
            `Entity ${this.name} took ${damage} damage, remaining health: ${this.health}/${this.maxHealth}`,
        )
    }

    die() {
        this.changeAnimation(AnimationType.DEAD, true, false)
        this.custom_properties['collidable'] = false
        this.isDead = true
    }

    isInAttackArc(target: Entity, angleRad: number = (2 * Math.PI) / 3): boolean {
        const attackerPos = this.pos
        const targetPos = target.pos
        const facingDir = this.facingDirection.x >= 0 ? 1 : -1
        const dirToTarget = new Vector2(targetPos.x - attackerPos.x, targetPos.y - attackerPos.y)
        dirToTarget.normalize()
        const facing = new Vector2(facingDir, 0)
        const dot = facing.scalar(dirToTarget)
        const angle = Math.acos(dot)
        return angle <= angleRad / 2
    }

    attack(keys: Set<string>) {
        let isAttacking = true
        let attackFactor: number = 1
        let usedAnimation: AnimationType = AnimationType.IDLE
        let attackType: 'basic' | 'q' | 'r' = 'basic'
        let cooldownFactor = 1

        if (
            keys.has('r') &&
            this.cooldowns.get(AnimationType.SPECIAL)?.value == 0 &&
            this.mana >= 400
        ) {
            this.changeAnimation(AnimationType.SPECIAL, true)
            usedAnimation = AnimationType.SPECIAL
            attackType = 'r'
            attackFactor = 3
            cooldownFactor = 5
        } else if (
            keys.has('q') &&
            this.cooldowns.get(AnimationType.ATTACK_2)?.value == 0 &&
            this.mana >= 200
        ) {
            this.changeAnimation(AnimationType.ATTACK_2, true)
            usedAnimation = AnimationType.ATTACK_2
            attackType = 'q'
            attackFactor = 2
            cooldownFactor = 2.5
        } else if (keys.has('e') && this.cooldowns.get(AnimationType.ATTACK_1)?.value == 0) {
            this.changeAnimation(AnimationType.ATTACK_1, true)
            usedAnimation = AnimationType.ATTACK_1
            attackType = 'basic'
            attackFactor = 1
            cooldownFactor = 1
        } else isAttacking = false

        if (!isAttacking) return

        this.handleAttack(attackType, attackFactor)
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

    handleAttack(type: 'basic' | 'q' | 'r', attackFactor: number) {
        const manaCost = type === 'q' ? 200 : type === 'r' ? 400 : 0
        if (manaCost > 0 && !this.consumeMana(manaCost)) return

        let baseDamage = this.attackPower * attackFactor

        const collidedEnemies = Array.from(this.collidedObjects)
            .map((c) => c.other)
            .filter((obj) => obj instanceof Entity && obj.id !== this.id) as Entity[]

        for (const enemy of collidedEnemies) {
            if (this.isInAttackArc(enemy)) {
                const damage = baseDamage * ((100 - enemy.defense) / 100)
                enemy.get_damage(damage)
            }
        }
    }

    render() {
        if (this.name !== 'player') {
            const ctx = this.ctx
            ctx.save()
            ctx.fillStyle = 'rgba(255, 0, 0, 0.75)'
            ctx.fillRect(
                this.pos.x,
                this.pos.y - 20,
                this.dim.x * (this.health / this.maxHealth),
                4,
            )
            ctx.restore()
        }
        super.render()
    }
}
