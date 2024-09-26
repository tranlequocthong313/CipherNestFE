import secretFileReducer, { initialSecretFilesState } from './secretFileReducer';
import { ISecretFile, IEmbeddedSecretFile } from '../interfaces/ISecretFile';
import { TSecretFileAction } from '../types/TSecretFile';

describe('secretFileReducer', () => {
    const mockFile: ISecretFile = {
        id: '1',
        name: 'file1.txt',
        path: '/path/to/file1.txt',
        size: 2048,
        type: 'text/plain',
        lastModified: Date.now(),
    };

    const mockEmbeddedFile: IEmbeddedSecretFile = {
        id: '2',
        name: 'embeddedFile1.txt',
        size: 1024,
    };

    it('should handle ADD_EMBEDDED_SECRET_FILES action', () => {
        const action: TSecretFileAction = {
            type: 'ADD_EMBEDDED_SECRET_FILES',
            payload: {
                files: [mockEmbeddedFile],
            },
        };
        const state = secretFileReducer(initialSecretFilesState, action);
        expect(state.embeddedFiles).toEqual([mockEmbeddedFile]);
        expect(state.totalEmbeddedSecretFileSize).toBe(mockEmbeddedFile.size);
    });

    it('should handle ADD action', () => {
        const initialState = {
            ...initialSecretFilesState,
            selectedCoverFileId: 'coverFile1',
        };

        const action: TSecretFileAction = {
            type: 'ADD',
            payload: {
                files: [mockFile],
            },
        };
        const state = secretFileReducer(initialState, action);
        expect(state.files[initialState.selectedCoverFileId]).toHaveLength(1);
        expect(state.totalSecretFileSize).toBe(mockFile.size);
    });

    it('should handle SELECT_COVER_FILE action', () => {
        const initialState = {
            ...initialSecretFilesState,
            files: {
                coverFile1: [mockFile],
            },
        };

        const action: TSecretFileAction = {
            type: 'SELECT_COVER_FILE',
            payload: {
                coverFileId: 'coverFile1',
            },
        };
        const state = secretFileReducer(initialState, action);
        expect(state.selectedCoverFileId).toBe('coverFile1');
        expect(state.totalSecretFileSize).toBe(mockFile.size);
        expect(state.embeddedFiles).toEqual([]);
    });

    it('should handle SELECT action', () => {
        const action: TSecretFileAction = {
            type: 'SELECT',
            payload: { id: mockFile.id },
        };
        const state = secretFileReducer(initialSecretFilesState, action);
        expect(state.selectedId).toBe(mockFile.id);
    });

    it('should handle DELETE action', () => {
        const initialState = {
            ...initialSecretFilesState,
            files: {
                coverFile1: [mockFile],
            },
            selectedCoverFileId: 'coverFile1',
        };

        const action: TSecretFileAction = {
            type: 'DELETE',
            payload: { id: mockFile.id },
        };
        const newState = secretFileReducer(initialState, action);
        expect(newState.files.coverFile1).toHaveLength(0);
        expect(newState.totalSecretFileSize).toBe(0);
    });

    it('should handle DELETE_BY_COVER_FILE action', () => {
        const initialState = {
            ...initialSecretFilesState,
            files: {
                coverFile1: [mockFile],
            },
            selectedCoverFileId: 'coverFile1',
        };

        const action: TSecretFileAction = {
            type: 'DELETE_BY_COVER_FILE',
            payload: { selectedCoverFileId: 'coverFile1' },
        };
        const newState = secretFileReducer(initialState, action);
        expect(newState.files['coverFile1']).toBeUndefined();
    });

    it('should handle DELETE_ALL action', () => {
        const initialState = {
            ...initialSecretFilesState,
            files: {
                coverFile1: [mockFile],
            },
        };
        const action: TSecretFileAction = {
            type: 'DELETE_ALL',
        };
        const newState = secretFileReducer(initialState, action);
        expect(newState).toEqual(initialSecretFilesState);
    });
});
