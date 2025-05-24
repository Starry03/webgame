import * as pako from 'pako'

const tileSize = 32

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
            background_map_image.src = '/assets/maps/rooms/boss_room/boss_background.png'
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
    // let results = {}
    let map_data: any = null
    try {
        const res = await fetch(path)
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        map_data = await res.json()
        const image = await loadImage(room_name)
        return image

        // const background_layer = map_data.layers.find(
        //     (layer: TiledLayer) => layer.name === 'background',
        // )
        // if (background_layer && background_layer.data) {
        //     const decoded = decodeTileLayer(background_layer.data)
        //     results = drawTiles(
        //         decoded,
        //         background_layer.width,
        //         background_layer.height,
        //         canvas,
        //         ctx,
        //         image,
        //     )
        // }
    }
    catch (err) {
        console.error("background image error: ", err)
        return null
    }

    // return results
}

export function decodeTileLayer(encoded_data: string): number[] {
    const binary = atob(encoded_data)
    const len = binary.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i)
    }
    //utilizzo della libreria pako
    const decompressed = pako.inflate(bytes)
    const tileData: number[] = []

    //ogni tile occupa 4 byte
    for (let i = 0; i < decompressed.length; i += 4) {
        const tileID =
            decompressed[i] |
            (decompressed[i + 1] << 8) |
            (decompressed[i + 2] << 16) |
            (decompressed[i + 3] << 24)
        tileData.push(tileID)
    }

    return tileData
}

export function drawTiles(
    decoded: number[],
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    background_map_image: HTMLImageElement,
) {
    const row_tiles = background_map_image.width / tileSize

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const tile_index = row * width + col
            const gid = decoded[tile_index]
            if (gid === 0) continue

            const tileX = ((gid - 1) % row_tiles) * tileSize
            const tileY = Math.floor((gid - 1) / row_tiles) * tileSize
            try {
                ctx?.drawImage(
                    background_map_image,
                    tileX,
                    tileY,
                    tileSize,
                    tileSize,
                    col * tileSize,
                    row * tileSize,
                    tileSize,
                    tileSize,
                )
            } catch (error) {
                console.error('catch error ctx', error)
            }
        }
    }
    return {
        image: background_map_image,
        tile_data: decoded,
        width: width,
        height: height,
    }
}

