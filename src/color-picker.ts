import { ColorPickerRenderable } from "./type";

/**
 * Main color picker interface class
 */
export class ColorPicker {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    /**
     * Color Picker constructor
     * @param canvas Canvas to render color picker in
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d') as any;

        // getContext may fail if context is not provided
        if (!this.context) {
            throw "Unable to retrieve canvas context";
        }
    }


    /**
     * Open the color picker in order to allow the user to pick a color
     * @param renderable Reference material from which the color must be picked
     * @return Picked color
     */
    public open(renderable: ColorPickerRenderable): Promise<string> {
        throw "todo"
    }

}