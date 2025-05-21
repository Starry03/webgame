import { Obj } from './Obj'
import { Vector2 } from './types'

export type CollisionInfo = {
    other: Obj | null
    dir: Vector2 | null
}

export class Collider {
    static collision_treshold: number = 10

    static update_collisions(objects: Obj[]) {
        for (let i = 0; i < objects.length - 1; i++) {
            for (let j = i + 1; j < objects.length; j++) {
                const obj = objects[i]
                const other = objects[j]
                const collision_info: CollisionInfo | null = Collider.get_collision(obj, other)
                if (collision_info) {
                    console.log('Collision detected', collision_info.dir)
                    obj.enterCollision(collision_info)
                    other.enterCollision(collision_info)
                } else {
                    obj.exitCollision({ other, dir: null })
                    other.exitCollision({ other: obj, dir: null })
                }
            }
        }
    }

    private static get_collision_info(
        obj: Obj | null = null,
        other: Obj | null = null,
        raycast: boolean = false,
    ): CollisionInfo | null {
        if (!obj || !other) return null
        if (!obj.custom_properties['collidable'] || !other.custom_properties['collidable'])
            return null

        const pos_obj = obj.pos
        const dim_obj = obj.dim
        const pos_other = other.pos
        const dim_other = other.dim
        const isCollision =
            pos_obj.x + dim_obj.x > pos_other.x &&
            pos_obj.x < pos_other.x + dim_other.x &&
            pos_obj.y + dim_obj.y > pos_other.y &&
            pos_obj.y < pos_other.y + dim_other.y
        if (!isCollision) return null
        const dir = new Vector2(
            pos_obj.x + dim_obj.x / 2 - (pos_other.x + dim_other.x / 2),
            pos_obj.y + dim_obj.y / 2 - (pos_other.y + dim_other.y / 2),
        )
        dir.normalize()
        return { other, dir: dir }
    }

    private static get_collision(
        obj: Obj,
        other: Obj,
        raycast: boolean = false,
    ): CollisionInfo | null {
        if (obj === other) return null
        return Collider.get_collision_info(obj, other, raycast)
    }
}
