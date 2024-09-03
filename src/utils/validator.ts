export const isValidFile = (file: File) => {
    return file.name && file.size >= 0 && file.lastModified;
};
