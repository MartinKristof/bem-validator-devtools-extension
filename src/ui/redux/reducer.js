import stateRecord from './state';
import { ACTION_SAVE_LINTED_RULES, ACTION_SHOW_ERROR, ACTION_SHOW_LOADING } from './constants';

const initialState = stateRecord;

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_SAVE_LINTED_RULES:
      return {
        ...state,
        rules: action.rules || [],
        loading: false,
        isValid: action.isValid || false,
        isBemDetected: action.isBemDetected || false,
      };
    case ACTION_SHOW_ERROR:
      return { ...state, error: action.error };
    case ACTION_SHOW_LOADING:
      return initialState;
    default:
      return state;
  }
};
