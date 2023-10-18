export const getLang = (): string => {
    if (navigator.languages) {
        return navigator.languages[0];
    }

    return navigator.language;
};
