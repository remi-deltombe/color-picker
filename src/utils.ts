/**
 * Create a hexadecimal color string based on rgb  
 * @param r Red value from 0 to 255
 * @param g Green value from 0 to 255
 * @param b Blue value from 0 to 255
 * @returns color under hexadecimal format
 */
export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(v => {
        const r = '00' + v.toString(16);
        return r.substring(r.length - 2);
    }).join('');
}