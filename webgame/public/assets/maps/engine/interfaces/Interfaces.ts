export interface TiledProperty {
    name: string;
    type: string;
    value: any;
}

export interface TiledObject {
    name: string;
    class: string;
    x: number;
    y: number;
    width: number;
    height: number;
    custom_properties?: TiledProperty[];
}

export interface TiledLayer {
    name: string;
    type: string;
    objects?: TiledObject[];
}

export interface TiledMap {
    layers: TiledLayer[];
}
