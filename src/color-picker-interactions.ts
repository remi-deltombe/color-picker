import { ColorPickerInteractionsOptions, Point } from "./color-picker-types";

// Usefull rendering constants
const TAU = Math.PI * 2;

/**
 * Main color picker interface class
 */
export class ColorPickerInteractions {
    /**
     * Current mouse position on the canvas
     */
    public mousePosition?: Point;

    private canvas: HTMLCanvasElement;

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