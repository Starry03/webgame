import { Obj } from './Obj'
import { Vector2 } from './types'

class Collider {
  static collision_treshold: number = 10

  static update_collisions(objects: Obj[]) {
    objects.forEach((obj: Obj) => obj.resetCollisions())

    for (let i = 0; i < objects.length - 1; i++) {
      for (let j = i + 1; j < objects.length; j++) {
        const obj = objects[i]
        const other = objects[j]
        const collision_info = Collider.get_collision(obj, other)
        if (collision_info.other && collision_info.point) {
          obj.onCollision(other, collision_info.point)
          other.onCollision(obj, collision_info.point)
        }
      }
    }
  }

  private static get_collision_info(
    obj: Obj | null = null,
    other: Obj | null = null,
    raycast: boolean = false,
  ): {
    other: Obj | null
    point: Vector2 | null
  } {
    if (!obj || !other) return { other: null, point: null }
    const dim_obj = obj.dim
    const diag_obj = Math.sqrt(dim_obj.x * dim_obj.x + dim_obj.y * dim_obj.y) / 2
    const dim_other = other.dim
    const diag_other = Math.sqrt(dim_other.x * dim_other.x + dim_other.y * dim_other.y) / 2
    const pos_obj = obj.pos
    const pos_other = other.pos
    const dist = Math.sqrt(
      (pos_obj.x - pos_other.x) * (pos_obj.x - pos_other.x) +
        (pos_obj.y - pos_other.y) * (pos_obj.y - pos_other.y),
    )
    const isCollision = dist <= diag_obj + diag_other + (raycast ? Collider.collision_treshold : 0)
    if (!isCollision) return { other: null, point: null }

    const point: Vector2 = new Vector2(
      (pos_obj.x + pos_other.x) / 2,
      (pos_obj.y + pos_other.y) / 2,
    )
    point.normalize()
    return { other, point: point }
  }

  private static get_collision(obj: Obj, other: Obj, raycast: boolean = false) {
    if (obj === other) return { other: null, dir: null }
    return Collider.get_collision_info(obj, other, raycast)
  }
}
