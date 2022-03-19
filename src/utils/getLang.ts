export const getLang = (): string => {
    if (navigator.languages !== undefined) return navigator.languages[0];
    return navigator.language;
};
