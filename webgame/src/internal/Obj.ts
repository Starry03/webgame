import { Collider, type CollisionInfo } from './collision'
import { AnimationType, Vector2 } from './types'
import { type Ref } from 'vue'

export class Obj {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    framePaths: Record<AnimationType, string[]>
    pos: Vector2
    dim: Vector2
    speed: number
    frames: Record<AnimationType, HTMLImageElement[]>
    selectedFrames: HTMLImageElement[] = []
    currentFrame
    lastUpdateTime
    facingDirection: Vector2
    currentAnimation: AnimationType
    prevAnimation: AnimationType | null
    isIdle: boolean
    ready: boolean
    cooldowns: Map<AnimationType, Ref<number>>
    isAnimationBlocking: boolean
    isInteractable: boolean
    isSolid: boolean
    FPS = 200
    frameDelay: number = 1000 / this.FPS
    collidedObjects: Set<CollisionInfo>
    interactedObjects: Set<CollisionInfo>
    time: number
    custom_properties: Record<string, any>
    name: string

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        initialAnimation: AnimationType = AnimationType.IDLE,
        isIdle = false,
        pos: Vector2,
        dim: Vector2,
        custom_properties: Record<string, any> = {},
        name: string,
    ) {
        this.canvas = canvas
        this.ctx = ctx
        this.pos = pos
        this.dim = dim
        this.speed = 0
        this.frames = {} as Record<AnimationType, HTMLImageElement[]>
        this.framePaths = {} as Record<AnimationType, string[]>
        this.currentFrame = 0
        this.time = 0
        this.lastUpdateTime = performance.now()
        this.facingDirection = new Vector2(0, 1)
        this.currentAnimation = initialAnimation
        this.prevAnimation = null
        this.isIdle = isIdle
        this.ready = false
        this.cooldowns = new Map<AnimationType, Ref>()
        this.isAnimationBlocking = false
        this.isInteractable = false
        this.isSolid = true
        this.collidedObjects = new Set<CollisionInfo>()
        this.interactedObjects = new Set<CollisionInfo>()
        this.custom_properties = custom_properties
        this.name = name
    }

    preloadImages() {
        const promises: Promise<void>[] = []
        for (const animation in this.framePaths) {
            const animType = animation as AnimationType
            this.frames[animType as AnimationType] = []
            this.framePaths[animType].forEach((path: string) => {
                const img = new Image()
                const promise = new Promise<void>((resolve, reject) => {
                    img.src = path
                    img.onerror = () => {
                        reject(`${path} failed to load`)
                    }
                    img.onload = () => {
                        const rateo = img.height / img.width
                        img.width = this.dim.x
                        img.height = this.dim.x * rateo
                        this.dim.y = img.height
                        this.frames[animType].push(img)
                        resolve()
                    }
                })
                promises.push(promise)
            })
        }
        Promise.all(promises)
            .then(() => {
                this.ready = true
                this.idle()
            })
            .catch((error) => {
                console.error('Error loading images:', error)
                this.ready = true
                this.idle()
            })
    }

    changeFrames(animationName: AnimationType) {
        this.changeAnimation(animationName)
        this.selectedFrames = this.frames[animationName]
    }

    drawFlipped(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        const ctx = this.ctx
        ctx.save()
        ctx.scale(-1, 1)
        ctx.drawImage(image, -x - width, y, width, height)
        ctx.restore()
    }

    drawFrame() {
        const ctx = this.ctx
        if (this.selectedFrames.length === 0 || !this.selectedFrames[this.currentFrame]) {
            console.error('Frame non disponibile o non caricato correttamente.')
            return
        }
        const frame = this.selectedFrames[this.currentFrame] || this.selectedFrames[0]
        if (frame.complete) {
            ctx.save()
            if (this.facingDirection.x < 0)
                this.drawFlipped(frame, this.pos.x, this.pos.y, this.dim.x, this.dim.y)
            else ctx.drawImage(frame, this.pos.x, this.pos.y, this.dim.x, this.dim.y)
            ctx.restore()
        }
    }

    animate(timestamp: number, deltaTime: number) {
        this.time += (timestamp - this.lastUpdateTime) * deltaTime
        if (this.time <= this.frameDelay) return
        this.time = 0
        this.currentFrame++
        this.lastUpdateTime = timestamp
        if (this.currentFrame >= this.selectedFrames.length) {
            this.currentFrame = 0
            if (
                this.cooldowns.has(this.currentAnimation) &&
                this.cooldowns.get(this.currentAnimation)?.value != 0
            ) {
                this.isAnimationBlocking = false
                this.idle()
            }
        }
    }

    move(keyPressed: string | Set<string>, deltaTime: number) {}

    canMove(possible_position: Vector2, direction: Vector2): boolean {
        let res = true
        const abs_dir = direction.direction()

        this.collidedObjects.forEach((collision: CollisionInfo) => {
            const isCollision = Collider.collides(
                possible_position,
                this.dim,
                collision.other.pos,
                collision.other.dim,
                0,
            )
            const abs_collision_dir = collision.dir?.direction()
            const dir_match =
                abs_collision_dir?.x === abs_dir.x || abs_collision_dir?.y === abs_dir.y
            if (isCollision && dir_match) {
                res = false
                return
            }
        })
        return res
    }

    isAnimationChanged() {
        return this.prevAnimation !== this.currentAnimation
    }

    changeAnimation(
        animationName: AnimationType,
        isBlocking: boolean = false,
        prevAnimation: AnimationType | null = null,
    ) {
        if (this.isAnimationBlocking) return
        this.currentFrame = 0
        if (prevAnimation) this.prevAnimation = prevAnimation
        else this.prevAnimation = this.currentAnimation
        if (animationName !== AnimationType.IDLE) this.isIdle = false
        this.currentAnimation = animationName
        if (isBlocking && !this.isAnimationBlocking) this.isAnimationBlocking = true
    }

    update(timestamp: number, deltaTime: number) {
        if (!this.ready) return
        if (this.isAnimationChanged() && !this.isIdle) {
            this.changeFrames(this.currentAnimation)
        }
        this.animate(timestamp, deltaTime)
        this.drawFrame()
    }

    idle(forced: boolean = false) {
        if (this.isIdle && !forced) return
        this.changeAnimation(AnimationType.IDLE)
        this.changeFrames(this.currentAnimation)
        this.isIdle = true
    }

    resetCollisions() {
        this.collidedObjects.clear()
    }

    enterCollision(collision: CollisionInfo) {
        for (const col of this.collidedObjects)
            if (col.other === collision.other && col.dir !== collision.dir) {
                col.dir = collision.dir
                return
            }
        this.collidedObjects.add(collision)
    }

    exitCollision(collision: CollisionInfo) {
        if (this.collidedObjects.size === 0) return
        for (const col of this.collidedObjects) {
            if (col.other === collision.other) {
                this.collidedObjects.delete(col)
                return
            }
        }
    }

    enterInteraction(collision: CollisionInfo) {
        for (const col of this.interactedObjects)
            if (col.other === collision.other && col.dir !== collision.dir) {
                col.dir = collision.dir
                return
            }
        this.interactedObjects.add(collision)
    }

    onInteraction() {}

    exitInteraction(collision: CollisionInfo) {
        if (this.interactedObjects.size === 0) return
        for (const col of this.interactedObjects) {
            if (col.other === collision.other) {
                this.interactedObjects.delete(col)
                return
            }
        }
    }

    getFramePaths(): Record<AnimationType, string[]> {
        return this.framePaths
    }

    setFramePaths(path: Record<AnimationType, string[]>) {
        this.framePaths = path
    }
}
