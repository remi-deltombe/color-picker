import { ColorPicker } from "./color-picker/color-picker";

async function main() {
    // retrieve dom elements
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const input = document.getElementById('input') as HTMLInputElement;
    const resultDiv = document.getElementById('result') as HTMLElement;
    if (!canvas || !canvas.getContext) {
        throw 'Unable to retrieve canvas';
    }


    // dom events
    input.onchange = () => {
        if (input.files?.length) {
            openColorPicker(URL.createObjectURL(input.files[0]))
        }
    }

    // init colorpicker
    const colorPicker = new ColorPicker({ canvas });

    /**
     * Retrieve a color from a given image and print it on screen when picked.
     * @param input HTMLImageElement source
     */
    async function openColorPicker(input: string) {
        resultDiv.innerHTML = ``;

        const image = await loadImage(input);
        const color = await colorPicker.open(image);
        if (color) {
            resultDiv.innerHTML = `Selected color is ${color}`;
        }
        else {
            resultDiv.innerHTML = ``;
        }
        console.log({ color })
    }

    // open default picture
    openColorPicker('http://localhost:5173/assets/image.jpg')
}

/**
 * Create an image dom element and return it when it's loaded
 * @param url Url to feed the img element with
 */
async function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const element = document.createElement('img');
        element.src = url;
        element.onload = () => {
            resolve(element);
        }
        element.onerror = () => {
            throw "fail to load image"
        }
    })
}

main();