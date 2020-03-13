import ColorHash from "color-hash"
let _COLORS = [];

export const colorForIndex = (index) => {
    return new ColorHash().hex(index);
};

export const tintForIndex = (index) => {
    return new ColorHash({lightness: 0.8}).hex(index);
};

export const COLORS = (() => {
    if (!!_COLORS.length) return _COLORS;

    for (let i = 0; i < 100; i += 1) {
        _COLORS.push(colorForIndex(i));
    }
    return _COLORS;
})();