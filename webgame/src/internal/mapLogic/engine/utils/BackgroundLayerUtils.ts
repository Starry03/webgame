export function loadImage(room_name: string): Promise<HTMLImageElement> {
    let background_map_image = new Image()
    switch (room_name) {
        case 'room1':
            background_map_image.src = '/assets/maps/rooms/room1/room1_background.png'
            break
        case 'room2':
            background_map_image.src = '/assets/maps/rooms/room2/room2_background.png'
            break
        case 'room3':
            background_map_image.src = '/assets/maps/rooms/room3/room3_background.png'
            break
        case 'room4':
            background_map_image.src = '/assets/maps/rooms/room4/room4_background.png'
            break
        case 'boss_room':
            background_map_image.src = '/assets/maps/rooms/boss_room/boss_room_background.png'
            break
        default:
            console.log("background image not found")
            background_map_image.src = ''
    }

    return new Promise((resolve, reject) => {
        background_map_image.onload = () => {
            resolve(background_map_image)
            //return background_map_image;
        }
        background_map_image.onerror = (err) => {
            console.log('Error during loading image', err)
            reject(err)
        }
    })
}

export async function loadMapData(
    path: string,
    room_name: string,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
): Promise<HTMLImageElement | null> {
    let map_data: any = null
    try {
        const res = await fetch(path)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        map_data = await res.json()
        const image = await loadImage(room_name)
        return image
    }
    catch (err) {
        console.error("background image error: ", err)
        return null
    }
}

