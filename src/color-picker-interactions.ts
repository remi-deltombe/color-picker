import { ColorPickerRenderer } from "./color-picker-renderer";
import { ColorPickerInteractionsOptions, ColorPickerOptions, ColorPickerRenderable, Point, Vector } from "./color-picker-types";
import { map, rgbToHex } from "./utils";

// Usefull rendering constants
const TAU = Math.PI * 2;

/**
 * Main color picker interface class
 */
export class ColorPickerInteractions {
    private canvas: HTMLCanvasElement;
    public mousePosition?: Point;

    /**
     * Color Picker constructor
     * @param canvas Canvas to render color picker in
     */
    constructor({ canvas, onRefreshRequest: onRefresh, onClick }: ColorPickerInteractionsOptions) {
        this.canvas = canvas;


        // dom events
        this.canvas.onmousemove = e => {
            this.mousePosition = {
                x: e.offsetX,
                y: e.offsetY
            }
            onRefresh();
        }

        this.canvas.onmouseleave = e => {
            this.mousePosition = undefined
            onRefresh();
        }

        this.canvas.onclick = e => {
            onClick()
        }
    }
}