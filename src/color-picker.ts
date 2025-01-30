import { ColorPickerOptions, ColorPickerRenderable, Size } from "./type";

// Usefull rendering constants
const TAU = Math.PI * 2;

/**
 * Main color picker interface class
 */
export class ColorPicker {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private renderable?: ColorPickerRenderable;

    /**
     * Color Picker constructor
     * @param canvas Canvas to render color picker in
     */
    constructor({ canvas, ...options }: ColorPickerOptions) {
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
    public async open(renderable: ColorPickerRenderable): Promise<string> {
        this.renderable = renderable;
        this.show();
        this.render();
        return '';
    }


    /**
     * Draw renderable as background with color picker if needed
     */
    private render() {
        ////////////////////// Setup
        if (!this.renderable) return;

        const { width, height } = this.renderable;

        // Set canvas dimension + clear it
        this.canvas.width = width;
        this.canvas.height = height;

        ////////////////////// Renderable
        // render renderable
        this.context.drawImage(this.renderable, 0, 0);

        ////////////////////// Picker
        // render picker
        const x = ~~(width / 2);
        const y = ~~(height / 2);
        const radius = 80;
        const zoomFactor = 2;

        // mask
        this.context.arc(x, y, radius, 0, TAU);
        this.context.clip();
        this.context.scale(zoomFactor, zoomFactor);
        this.context.drawImage(this.renderable, -x / zoomFactor, -y / zoomFactor);

    }



    private show() {
        this.canvas.style.display = 'block';

    }
    private hide() {
        this.canvas.style.display = 'none';

    }

}