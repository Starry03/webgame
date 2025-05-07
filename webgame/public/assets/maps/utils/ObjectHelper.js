export function extractCustomProperties(tiled_object) {
    const props = {};
    if (tiled_object.properties) {
      tiled_object.properties.forEach(prop => {
        props[prop.name] = prop.value;
      });
    }
    return props;
}

export function loadFramesForObject() {
    frame_properties = {

    }
}