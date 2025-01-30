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
    private resolveClick?: Function;
    private hoveredColor: string = '';

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

        this.canvas.onclick = e => {
            if (this.resolveClick) {
                this.resolveClick(this.hoveredColor);
                this.hide();
            }
        }
    }


    /**
     * Open the color picker in order to allow the user to pick a color
     * @param renderable Reference material from which the color must be picked
     * @return Picked color
     */
    public async open(renderable: ColorPickerRenderable): Promise<string> {
        if (this.resolveClick) {
            throw "Color picker is already opened";
        }
        this.renderable = renderable;
        this.show();
        this.render();
        return new Promise(resolve => {
            this.resolveClick = resolve;
        });
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
        /* uncomment to debug rendering easily without having to mouseover
        if (!this.mousePosition) {
            this.mousePosition = {
                x: 300,
                y: 354
            }
        }
        */
        if (this.mousePosition) {
            // render picker
            const { x, y } = this.mousePosition;
            const [r, g, b] = this.context.getImageData(x, y, 1, 1).data;
            this.hoveredColor = rgbToHex(r, g, b);
            const radius = 80;
            const zoomFactor = 12

            // mask
            this.context.arc(x, y, radius, 0, TAU);
            this.context.clip();

            // background
            this.context.save();
            this.context.setTransform(zoomFactor, 0, 0, zoomFactor, 0, 0);
            this.context.drawImage(
                this.renderable,
                // cursor position - scaled  canvas dimension- pixel shift for the color picker
                -x + x / zoomFactor - 0.5,
                -y + y / zoomFactor - 0.5
            );
            this.context.restore();

            // grid
            this.context.fillStyle = 'rgba(0,0,0,0.3)';
            const pixelAlignment = 7 + zoomFactor / 2; // << Need to compute this properly, constant for zoomFactor???
            for (let dy = -radius + pixelAlignment; dy < radius; dy += zoomFactor) {
                this.context.fillRect(x - radius, y + dy, radius * 2, 1);
            }
            for (let dx = -radius + pixelAlignment; dx < radius; dx += zoomFactor) {
                this.context.fillRect(x + dx, y - radius, 1, radius * 2);
            }

            // border
            this.context.arc(x, y, radius, 0, TAU);
            this.context.strokeStyle = this.hoveredColor;
            this.context.lineWidth = 25;
            this.context.stroke();

            this.context.arc(x, y, radius, 0, TAU);
            this.context.strokeStyle = 'white';
            this.context.lineWidth = 8;
            this.context.stroke();

            // color text
            this.context.fillStyle = '#525659';
            this.context.fillRect(x - 27, y - 11 + 30, 52, 15);
            this.context.textAlign = "center";
            this.context.font = "11px sans-serif";
            this.context.fillStyle = 'white';
            this.context.fillText(this.hoveredColor, x, y + 30);
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