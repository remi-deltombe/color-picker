import { ColorPickerInteractions } from "./interactions";
import { ColorPickerRenderer } from "./renderer";
import { ColorPickerOptions, ColorPickerRenderable } from "./types";

// Usefull rendering constants
const TAU = Math.PI * 2;

/**
 * Main color picker interface class
 */
export class ColorPicker {
    private canvas: HTMLCanvasElement;
    private resolveClick?: Function;
    private renderer: ColorPickerRenderer;
    private interactions: ColorPickerInteractions;

    /**
     * Color Picker constructor
     * @param canvas Canvas to render color picker in
     */
    constructor(options: ColorPickerOptions) {
        this.canvas = options.canvas;
        this.renderer = new ColorPickerRenderer({
            ...options
        });
        this.interactions = new ColorPickerInteractions({
            ...options,
            onRefreshRequest: () => this.render(),
            onClick: () => this.resolvePromise()
        })
    }

    /**
     * Open the color picker in order to allow the user to pick a color
     * @param renderable Reference material from which the color must be picked
     * @return Picked color
     */
    public async open(renderable: ColorPickerRenderable): Promise<string | null> {
        this.resolvePromise(null)
        this.renderer.renderable = renderable;
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
        this.renderer.render(this.interactions.mousePosition);
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

    /**
     * Resolve created promise from open function if needed 
     */
    private resolvePromise(resolveWith: string | null = this.renderer.hoveredColor) {
        if (this.resolveClick) {
            this.resolveClick(resolveWith);
            this.hide();
        }
    }

}