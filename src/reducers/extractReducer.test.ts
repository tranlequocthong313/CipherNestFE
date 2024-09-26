import extractReducer, { initialExtractState } from './extractReducer';
import { TExtract } from '../types/TExtract';

describe('extractReducer', () => {
    it('should handle OPEN_PASSWORD_MODAL action', () => {
        const action: TExtract = {
            type: 'OPEN_PASSWORD_MODAL',
            payload: { isWrongPassword: true },
        };
        const state = extractReducer(initialExtractState, action);
        expect(state.isOpenPasswordModal).toBe(true);
        expect(state.isWrongPassword).toBe(true);
    });

    it('should handle CLOSE_PASSWORD_MODAL action', () => {
        const initialState = {
            ...initialExtractState,
            isOpenPasswordModal: true,
        };
        const action: TExtract = {
            type: 'CLOSE_PASSWORD_MODAL',
        };
        const state = extractReducer(initialState, action);
        expect(state.isOpenPasswordModal).toBe(false);
    });
});;
