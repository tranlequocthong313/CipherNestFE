import { formatFileSize, formatPercentage, formatDateTime, formatDuration } from './formatter'

describe('formatFileSize', () => {
    it('should format file size in MB for sizes larger than 1MB', () => {
        expect(formatFileSize(1048576)).toBe('1 MB');
        expect(formatFileSize(2097152)).toBe('2 MB');
    });

    it('should format file size in Bytes for sizes less than 1MB', () => {
        expect(formatFileSize(1023)).toBe('1023 Bytes');
        expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('should round MB values to one decimal place', () => {
        expect(formatFileSize(1572864)).toBe('1.5 MB');
        expect(formatFileSize(3145728)).toBe('3 MB');
    });
});

describe('formatPercentage', () => {
    it('should format number as percentage', () => {
        expect(formatPercentage(50)).toBe('50%');
        expect(formatPercentage(100)).toBe('100%');
    });

    it('should handle edge cases like zero and negative values', () => {
        expect(formatPercentage(0)).toBe('0%');
        expect(formatPercentage(-5)).toBe('-5%');
    });
});

describe('formatDateTime', () => {
    it('should format timestamp into dd/MM/yyyy HH:mm:ss', () => {
        const timestamp = new Date(2023, 8, 25, 14, 30, 45).getTime();
        expect(formatDateTime(timestamp)).toBe('25/09/2023 14:30:45');
    });

    it('should handle single-digit day, month, hour, minute, second', () => {
        const timestamp = new Date(2023, 0, 9, 8, 5, 2).getTime();
        expect(formatDateTime(timestamp)).toBe('09/01/2023 08:05:02');
    });
});

describe('formatDuration', () => {
    it('should format duration in hours, minutes, and seconds', () => {
        expect(formatDuration(3661)).toBe('1:01:01');
        expect(formatDuration(7322)).toBe('2:02:02');
    });

    it('should format duration in minutes and seconds when less than an hour', () => {
        expect(formatDuration(3599)).toBe('59:59');
        expect(formatDuration(123)).toBe('2:03');
    });

    it('should return "N/A" for undefined or null duration', () => {
        expect(formatDuration(undefined)).toBe('N/A');
        expect(formatDuration(null)).toBe('N/A');
    });

    it('should format seconds correctly when less than a minute', () => {
        expect(formatDuration(45)).toBe('0:45');
        expect(formatDuration(5)).toBe('0:05');
    });
});
