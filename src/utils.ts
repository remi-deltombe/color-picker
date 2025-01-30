

export function map(v: number, fm: number, fM: number, tm: number, tM): number {
    return tm + (v - fm) * (tM - tm) / (fM - fm);
}

export function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(v => {
        const r = '00' + v.toString(16);
        return r.substring(r.length - 2);
    }).join('');
}