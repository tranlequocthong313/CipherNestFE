import { isValidFile } from './validator'; // Adjust the import path based on your project structure

describe('isValidFile', () => {
    it('should return true for a valid file object', () => {
        const file = new File(['test content'], 'test-file.txt', {
            type: 'text/plain',
            lastModified: Date.now()
        });

        const result = isValidFile(file);
        expect(result).toBe(true);
    });

    it('should return false if file name is missing', () => {
        const file = new File(['test content'], '', {
            type: 'text/plain',
            lastModified: Date.now()
        });

        const result = isValidFile(file);
        expect(result).toBe(false);
    });

    it('should return false if file size is negative', () => {
        const file = new File(['test content'], 'test-file.txt', {
            type: 'text/plain',
            lastModified: Date.now()
        });

        Object.defineProperty(file, 'size', { value: -100 });

        const result = isValidFile(file);
        expect(result).toBe(false);
    });

    it('should return false if file has no lastModified value', () => {
        const file = new File(['test content'], 'test-file.txt', {
            type: 'text/plain',
            lastModified: Date.now()
        });

        Object.defineProperty(file, 'lastModified', { value: undefined });

        const result = isValidFile(file);
        expect(result).toBe(false);
    });

    it('should return true for valid file with webkitRelativePath', () => {
        const file = new File(['test content'], 'test-file.txt', {
            type: 'text/plain',
            lastModified: Date.now()
        });

        Object.defineProperty(file, 'webkitRelativePath', { value: 'some/directory/test-file.txt' });

        const result = isValidFile(file);
        expect(result).toBe(true);
    });
});

