import { Obj } from './Obj'
import { Vector2 } from './types'

export type CollisionInfo = {
    other: Obj
    dir: Vector2 | null
}

export class Collider {
    static collision_treshold: number = 10
    static collidable_classes: string[] = ['collidable', 'interactable', 'takeable']

    private static isCollidable(obj: Obj): boolean {
        const props = obj.custom_properties
        for (const prop of this.collidable_classes) {
            if (Collider.collidable_classes.includes(prop) && props[prop] === true) {
                return true
            }
        }
        return false
    }

    private static trigger_collision(obj: Obj, other: Obj, collision_info: CollisionInfo | null) {
        if (collision_info !== null && collision_info.dir !== null) {
            obj.enterCollision({ other: other, dir: collision_info.dir })
            other.enterCollision({
                other: obj,
                dir: new Vector2(-collision_info.dir.x, -collision_info.dir.y),
            })
        } else {
            obj.exitCollision({ other: other, dir: null })
            other.exitCollision({ other: obj, dir: null })
        }
    }

    private static trigger_interaction(obj: Obj, other: Obj, collision_info: CollisionInfo | null) {
        if (collision_info !== null && collision_info.dir !== null) {
            obj.enterInteraction({ other: other, dir: collision_info.dir })
            other.enterInteraction({
                other: obj,
                dir: new Vector2(-collision_info.dir.x, -collision_info.dir.y),
            })
        } else {
            obj.exitInteraction({ other: other, dir: null })
            other.exitInteraction({ other: obj, dir: null })
        }
    }

    static update_collisions(objects: Obj[]) {
        for (let i = 0; i < objects.length - 1; i++) {
            for (let j = i + 1; j < objects.length; j++) {
                const obj = objects[i]
                const other = objects[j]
                const collision_info: CollisionInfo | null = Collider.get_collision(obj, other)
                const use_interaction =
                    obj.custom_properties['interactable'] || obj.custom_properties['takeable']
                const use_collision = obj.custom_properties['collidable'] && other.custom_properties['collidable']
                if (use_interaction) Collider.trigger_interaction(obj, other, collision_info)
                if (use_collision) Collider.trigger_collision(obj, other, collision_info)
            }
        }
    }

    public static collides(
        pos_obj: Vector2,
        dim_obj: Vector2,
        pos_other: Vector2,
        dim_other: Vector2,
        threshold: number = Collider.collision_treshold,
    ): boolean {
        return (
            pos_obj.x + dim_obj.x > pos_other.x - threshold &&
            pos_obj.x < pos_other.x + dim_other.x + threshold &&
            pos_obj.y + dim_obj.y > pos_other.y - threshold &&
            pos_obj.y < pos_other.y + dim_other.y + threshold
        )
    }

    private static get_collision_info(
        obj: Obj | null = null,
        other: Obj | null = null,
    ): CollisionInfo | null {
        if (!obj || !other) return null
        if (obj.custom_properties === undefined || other.custom_properties === undefined)
            return null
        if (!Collider.isCollidable(obj) || !Collider.isCollidable(other)) return null

        const pos_obj = obj.pos
        const dim_obj = obj.dim
        const pos_other = other.pos
        const dim_other = other.dim
        const isCollision = this.collides(
            pos_obj,
            dim_obj,
            pos_other,
            dim_other,
            obj.custom_properties['interactable']
                ? Collider.collision_treshold * 10
                : Collider.collision_treshold,
        )
        if (!isCollision) return null
        const dir = new Vector2(
            pos_other.x + dim_other.x / 2 - (pos_obj.x + dim_obj.x / 2),
            pos_other.y + dim_other.y / 2 - (pos_obj.y + dim_obj.y / 2),
        )
        dir.normalize()
        return { other, dir: dir }
    }

    private static get_collision(obj: Obj, other: Obj): CollisionInfo | null {
        if (obj.id === other.id) return null
        return Collider.get_collision_info(obj, other)
    }
}
