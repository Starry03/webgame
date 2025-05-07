import { Obj } from './Obj'

class Collider {
  private static collided(obj: Obj, other: Obj): boolean {
    const dim_obj = obj.dim;
    const diag_obj = Math.sqrt(dim_obj.x * dim_obj.x + dim_obj.y * dim_obj.y) / 2;
    const dim_other = other.dim;
    const diag_other = Math.sqrt(dim_other.x * dim_other.x + dim_other.y * dim_other.y) / 2;
    const pos_obj = obj.pos;
    const pos_other = other.pos;
    const dist = Math.sqrt(
      (pos_obj.x - pos_other.x) * (pos_obj.x - pos_other.x) +
        (pos_obj.y - pos_other.y) * (pos_obj.y - pos_other.y),
    );
    return dist <= diag_obj + diag_other;
  }

  static get_collision(obj, other) {

  }
}
