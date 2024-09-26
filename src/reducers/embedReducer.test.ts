import embedReducer, { initialEmbedState } from './embedReducer';
import { TEmbed } from '../types/TEmbed';
import { OUTPUT_QUALITIES } from '../configs/constant';

describe('embedReducer', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should handle UPDATE_FREE_SPACE action with valid payload', () => {
        const action: TEmbed = {
            type: 'UPDATE_FREE_SPACE',
            payload: { freeSpace: 100 },
        };
        const state = embedReducer(initialEmbedState, action);
        expect(state.freeSpace).toBe(100);
    });

    it('should throw an error when freeSpace is less than or equal to 0', () => {
        const action: TEmbed = {
            type: 'UPDATE_FREE_SPACE',
            payload: { freeSpace: -1 },
        };
        expect(() => embedReducer(initialEmbedState, action)).toThrow("Free space must be greater than 0");
    });

    it('should handle CHANGE_OUTPUT_QUALITY action', () => {
        const action: TEmbed = {
            type: 'CHANGE_OUTPUT_QUALITY',
            payload: { outputQuality: OUTPUT_QUALITIES.HIGH },
        };
        const state = embedReducer(initialEmbedState, action);
        expect(state.outputQuality).toBe(OUTPUT_QUALITIES.HIGH);
        expect(state.freeSpace).toBe(0);
    });

    it('should handle CLEAR action', () => {
        const initialState = {
            ...initialEmbedState,
            freeSpace: 100,
        };
        const action: TEmbed = {
            type: 'CLEAR',
        };
        const state = embedReducer(initialState, action);
        expect(state.freeSpace).toBe(0);
    });
})
