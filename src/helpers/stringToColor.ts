// export const stringToColor = (str: string) => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i += 1) {
//         /* eslint-disable no-bitwise */
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let colour = '#';
//     for (let i = 0; i < 3; i += 1) {
//         /* eslint-disable no-bitwise */
//         const value = (hash >> (i * 8)) & 0xff;
//         /* eslint-disable prefer-template */
//         colour += ('00' + value.toString(16)).substr(-2);
//     }
//     return colour;
// };

export function stringToColor(stringInput: string) {
    const stringUniqueHash = [...stringInput].reduce((acc, char) => {
        /* eslint-disable no-bitwise */
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 65%, 50%)`;
}
