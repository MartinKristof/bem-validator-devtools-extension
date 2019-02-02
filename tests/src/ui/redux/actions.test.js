import { inspectElement, saveLintedRules, showError, showLoading } from '../../../../src/ui/redux/actions';
import {
  ACTION_INSPECT_ELEMENT,
  ACTION_SAVE_LINTED_RULES,
  ACTION_SHOW_ERROR,
  ACTION_SHOW_LOADING,
} from '../../../../src/ui/redux/constants';

global.browser = {
  ...global.browser,
  devtools: {
    inspectedWindow: {
      tabId: 10,
    },
  },
};

describe('actions', () => {
  describe('#saveLintedRules', () => {
    it('should call action with params', () => {
      const expectedAction = {
        type: ACTION_SAVE_LINTED_RULES,
        rules: [{ foo: '.bar' }],
        isBemDetected: true,
        isValid: false,
      };

      const payload = { rules: [{ foo: '.bar' }], isBemDetected: true, isValid: false };
      expect(saveLintedRules(payload)).toEqual(expectedAction);
    });
  });

  describe('#showLoading', () => {
    it('should call action', () => {
      const expectedAction = {
        type: ACTION_SHOW_LOADING,
      };

      expect(showLoading()).toEqual(expectedAction);
    });
  });

  describe('#showError', () => {
    it('should call action', () => {
      const expectedAction = {
        type: ACTION_SHOW_ERROR,
      };

      expect(showError()).toEqual(expectedAction);
    });
  });

  describe('#inspectElement', () => {
    it('should call action with param', () => {
      const expectedAction = {
        type: ACTION_INSPECT_ELEMENT,
        element: '.element',
      };

      expect(inspectElement('.element')).toEqual(expectedAction);
    });
  });
});
