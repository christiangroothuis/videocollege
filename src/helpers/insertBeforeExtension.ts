export const insertBeforeExtension = (filename: string, insertion: string): string => {
    return filename.replace(/(\.[\w\d_-]+)$/i, `${insertion}$1`);
};
