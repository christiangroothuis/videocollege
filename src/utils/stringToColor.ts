export const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
        /* eslint-disable no-bitwise */
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i += 1) {
        /* eslint-disable no-bitwise */
        const value = (hash >> (i * 8)) & 0xff;
        /* eslint-disable prefer-template */
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
};
