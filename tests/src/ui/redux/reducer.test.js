import reducer from '../../../../src/ui/redux/reducer';
import { ACTION_SAVE_LINTED_RULES, ACTION_SHOW_ERROR, ACTION_SHOW_LOADING } from '../../../../src/ui/redux/constants';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: '',
      isBemDetected: false,
      isValid: false,
      loading: true,
      rules: [],
    });
  });

  it('should return state with rules', () => {
    expect(
      reducer([], {
        type: ACTION_SAVE_LINTED_RULES,
        rules: [{ foo: '.bar' }],
        isBemDetected: true,
        isValid: false,
      }),
    ).toEqual({
      isBemDetected: true,
      isValid: false,
      loading: false,
      rules: [{ foo: '.bar' }],
    });
  });

  it('should return state with loading', () => {
    expect(
      reducer([], {
        type: ACTION_SHOW_LOADING,
      }),
    ).toEqual({
      loading: true,
    });
  });

  it('should return state with error', () => {
    expect(
      reducer([], {
        type: ACTION_SHOW_ERROR,
        error: 'Error',
      }),
    ).toEqual({
      error: 'Error',
    });
  });
});
