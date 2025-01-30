import { ColorPickerOptions, ColorPickerRenderable, Point, Size } from "./type";
import { map, rgbToHex } from "./utils";

// Usefull rendering constants
const TAU = Math.PI * 2;

/**
 * Main color picker interface class
 */
export class ColorPicker {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private renderable?: ColorPickerRenderable;
    private mousePosition?: Point;

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

        this.canvas.onmousemove = e => {
            this.mousePosition = {
                x: e.offsetX,
                y: e.offsetY
            }
            this.render();
        }

        this.canvas.onmouseleave = e => {
            this.mousePosition = undefined
            this.render();
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

        // prevent blur while zooming image
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        ////////////////////// Renderable
        // render renderable
        this.context.drawImage(this.renderable, 0, 0);

        ////////////////////// Picker
        if (!this.mousePosition) {
            this.mousePosition = {
                x: 200,
                y: 200
            }
        }
        if (this.mousePosition) {
            // render picker
            const { x, y } = this.mousePosition;
            const [r, g, b] = this.context.getImageData(x, y, 1, 1).data;
            const color = rgbToHex(r, g, b);
            console.log(color)
            const radius = 80;
            const zoomFactor = 10;

            // mask
            this.context.arc(x, y, radius, 0, TAU);
            this.context.clip();

            // background
            this.context.save();
            this.context.setTransform(zoomFactor, 0, 0, zoomFactor, 0, 0);
            this.context.drawImage(
                this.renderable,
                -x + x / zoomFactor,
                -y + y / zoomFactor
            );
            this.context.restore();

            // border
            this.context.arc(x, y, radius, 0, TAU);
            this.context.strokeStyle = color;
            this.context.lineWidth = 30;
            this.context.stroke();

            this.context.arc(x, y, radius, 0, TAU);
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 15;
            this.context.stroke();

            // color text
            this.context.fillStyle = '#525659';
            this.context.fillRect(x - 27, y - 11 + 30, 52, 15);
            this.context.textAlign = "center";
            this.context.font = "11px sans-serif";
            this.context.fillStyle = 'white';
            this.context.fillText(color, x, y + 30);

        }

    }

    /**
     * Show color picker canvas 
     */
    private show() {
        this.canvas.style.display = 'block';

    }

    /**
     * Hide color picker canvas 
     */
    private hide() {
        this.canvas.style.display = 'none';

    }

}