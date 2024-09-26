export const isValidFile = (file: File) => {
    if (file.name && file.size >= 0 && file.lastModified) {
        return true
    }
    return false
};
