import { Entity } from './Entity'
import type { Obj } from './Obj'

export class Player extends Entity {
    interact(other: Obj): void {
        other.onInteraction()
    }
}
