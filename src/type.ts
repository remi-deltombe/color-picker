
export type ColorPickerRenderable = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;

export type ColorPickerOptions = {
    canvas: HTMLCanvasElement;
}

export interface Point {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}