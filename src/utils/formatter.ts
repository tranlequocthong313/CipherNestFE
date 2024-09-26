export const formatFileSize = (size: number) => {
    const res = parseFloat((size / (1024 * 1024)).toFixed(1))
    if (res > 0) {
        return `${res} MB`;
    } else {
        return `${size} Bytes`;
    }
};

export const formatPercentage = (number: number) => {
    return `${number}%`;
};

export const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
};

export const formatDuration = (duration: number | undefined | null): string => {
    if (!duration) {
        return 'N/A'
    }
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const formattedMinutes =
        hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
};
