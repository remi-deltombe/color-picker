
export type ColorPickerRenderable = HTMLImageElement | HTMLCanvasElement | OffscreenCanvas;

/**
 * Color picker base options
 */
export interface ColorPickerOptions {
    canvas: HTMLCanvasElement;
}

/**
 * Color picker interactions options
 */
export interface ColorPickerInteractionsOptions extends ColorPickerOptions {
    /**
     * Called when UI need to be refresh
     */
    onRefreshRequest: () => void;

    /**
     * Called when UI is clicked
     */
    onClick: () => void;
}

/**
 * 2d point structure
 */
export interface Point {
    x: number;
    y: number;
}

/**
 * 2d vector structure
 */
export interface Vector {
    width: number;
    height: number;
}