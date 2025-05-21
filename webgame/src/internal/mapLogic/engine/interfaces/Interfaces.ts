export interface TiledProperty {
    name: string;
    type: string;
    value: any;
}

export interface TiledObject {
    name: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    properties?: TiledProperty[];
}

export interface TiledLayer {
    name: string;
    type: string;
    objects: TiledObject[];
    data?: string;
    draworder?: string;
}

export interface TiledMap {
    layers: TiledLayer[];
}
