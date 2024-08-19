export const getDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
        const audio = document.createElement("audio");
        const objectUrl = URL.createObjectURL(file);
        audio.src = objectUrl;
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
            URL.revokeObjectURL(objectUrl); // Giải phóng URL object khi không còn cần thiết
        });
    });
};
