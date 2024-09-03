export const DEBUG = process.env.REACT_APP_ENVIRONMENT === "development";

export const ENV = process.env.REACT_APP_ENVIRONMENT || "development";

export const ALGORITHMS = Object.freeze({
    LSB: "LSB",
    ECHO_HIDING: "Echo Hiding",
    AMPLITUDE_CODING: "Amplitude Coding",
    SPREAD_SPECTRUM: "Spread Spectrum",
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
    IS_EMBEDDED_BY_SYSTEM: "03"
})
