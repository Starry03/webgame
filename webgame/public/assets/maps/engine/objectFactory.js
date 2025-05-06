import NotAnimatedObject from '../classes/NotAnimatedObject'
import AnimatedObject from '../classes/AnimatedObject'

export function createNotAnimatedObject(object_data) {
    return new NotAnimatedObject ({
        name: object_data.data,
        x: object_data.x,
        y: object_data.y,
        width: object_data.width,
        height: object_data.height
    })
}

export function createAnimatedObject(object_data) {
    return new AnimatedObject ({
        name: object_data.name,
        x: object_data.x,
        y: object_data.y,
        width: object_data.width,
        height: object_data.height,
        custom_properties: object_data.custom_properties
    })
}

export function createObject(object_data) {
    const hasCustomProperties = object_data.custom_properties?.find(
        prop => prop.name === 'custom_properties'
    )
    if (hasCustomProperties.value) {
        return createAnimatedObject(object_data);
    }
    else {
        return createNotAnimatedObject(object_data);
    }
}