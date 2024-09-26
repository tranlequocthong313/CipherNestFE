import coverFileReducer, { initialCoverFilesState } from './coverFileReducer';
import { TCoverFileAction } from '../types/TCoverFile';
import { ICoverFile } from '../interfaces/ICoverFile';

describe('coverFileReducer', () => {
    const mockFile: ICoverFile = {
        id: '1',
        name: 'file1.mp3',
        path: '/path/to/file1.mp3',
        size: 1024,
        type: 'audio/mpeg',
        lastModified: Date.now(),
        blob: 'blob',
    };

    it('should handle ADD action', () => {
        const action: TCoverFileAction = {
            type: 'ADD',
            payload: {
                files: [mockFile],
            },
        };
        const state = coverFileReducer(initialCoverFilesState, action);
        expect(state.files).toHaveLength(1);
        expect(state.selectedId).toBe(mockFile.id);
        expect(state.onActionSelectedId).toBe(mockFile.id);
    });

    it('should handle UPDATE_INFO action', () => {
        const initialState = {
            ...initialCoverFilesState,
            files: [mockFile],
            selectedId: mockFile.id,
        };

        const action: TCoverFileAction = {
            type: 'UPDATE_INFO',
            payload: {
                new_info: { name: 'updatedFile.mp3' },
            },
        };

        const newState = coverFileReducer(initialState, action);
        expect(newState.files[0].name).toBe('updatedFile.mp3');
    });

    it('should handle SELECT action', () => {
        const action: TCoverFileAction = {
            type: 'SELECT',
            payload: { id: mockFile.id },
        };
        const state = coverFileReducer(initialCoverFilesState, action);
        expect(state.selectedId).toBe(mockFile.id);
        expect(state.onActionSelectedId).toBe(mockFile.id);
    });

    it('should handle DELETE action', () => {
        const initialState = {
            ...initialCoverFilesState,
            files: [mockFile],
        };
        const action: TCoverFileAction = {
            type: 'DELETE',
            payload: { id: mockFile.id },
        };
        const newState = coverFileReducer(initialState, action);
        expect(newState.files).toHaveLength(0);
        expect(newState.selectedId).toBe('');
        expect(newState.onActionSelectedId).toBe('');
    });

    it('should handle DELETE_ALL action', () => {
        const initialState = {
            ...initialCoverFilesState,
            files: [mockFile],
        };
        const action: TCoverFileAction = {
            type: 'DELETE_ALL',
        };
        const newState = coverFileReducer(initialState, action);
        expect(newState).toEqual(initialCoverFilesState);
    });
});

