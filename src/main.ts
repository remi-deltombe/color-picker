import { ColorPicker } from "./color-picker";



async function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) {
        throw 'Unable to retrieve canvas';
    }

    const image = await loadImage('http://localhost:5173/assets/image.jpg');
    const colorPicker = new ColorPicker({ canvas });
    const color = await colorPicker.open(image);
    console.log({ color })
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