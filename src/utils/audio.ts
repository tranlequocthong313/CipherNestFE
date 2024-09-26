import { MIME_TYPE_OF_SUPPORTED_AUDIO_FORMATS } from "../configs/constant";

export const getDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        if (!MIME_TYPE_OF_SUPPORTED_AUDIO_FORMATS.includes(file.type)) {
            reject(`Unsupported audio format: ${file.type}`)
        }
        const audio = document.createElement("audio");
        const objectUrl = URL.createObjectURL(file);
        audio.src = objectUrl;
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration);
            URL.revokeObjectURL(objectUrl); 
        });
    });
};
