export const DEBUG = process.env.REACT_APP_ENVIRONMENT === "development";

export const ENV = process.env.REACT_APP_ENVIRONMENT || "development";

export const ALGORITHMS = Object.freeze({
    LSB: "LSB",
});

export const OUTPUT_QUALITIES = Object.freeze({
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    high: 'high',
})

export const LOCAL_STORAGE_OUTPUT_QUALITY_KEY = "outputQuality"
export const LOCAL_STORAGE_COMPRESSED_KEY = "compressed"
export const LOCAL_STORAGE_ALGORITHM_KEY = "algorithm"

export const CODES = Object.freeze({
    SUCCESS: "00",
    RUN_OUT_OF_FREE_SPACE: "01",
    NOT_EMBEDDED_BY_SYSTEM: "02",
    IS_EMBEDDED_BY_SYSTEM: "03",
    INTERNAL_SERVER_ERROR: "04",
    INVALID_REQUEST_DATA: "05",
    REQUIRE_PASSWORD: "05",
    WRONG_PASSWORD: "06",
    DATA_CORRUPTED: "07",
})

export const MIME_TYPE_OF_SUPPORTED_AUDIO_FORMATS = ['audio/x-wav', 'audio/flac']
export const EXTENSION_OF_SUPPORTED_AUDIO_FORMATS = ['.wav', '.flac', '.aiff']
