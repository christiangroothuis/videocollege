export const msToHHmmss = (milliseconds: number, hideHH = true): string => {
    const durationISOString = new Date(milliseconds).toISOString();

    if (hideHH && milliseconds / 1000 < 3600) {
        return durationISOString.substr(14, 5);
    }

    return durationISOString.substr(11, 8);
};
