export function  getResultAssetsImg(name) {
    return new URL(`../assets/images/game/${name}.png`, import.meta.url).href
};

