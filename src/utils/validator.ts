export const isValidFile = (file: File) => {
    return file.name && file.size && file.lastModified && file.type;
};
