import { ACTION_INSPECT_ELEMENT, ACTION_SAVE_LINTED_RULES, ACTION_SHOW_ERROR, ACTION_SHOW_LOADING } from './constants';
import { inspect } from '../inspect';

export const saveLintedRules = ({ rules, isBemDetected, isValid }) => ({
  type: ACTION_SAVE_LINTED_RULES,
  rules,
  isBemDetected,
  isValid,
});

export const showLoading = () => ({
  type: ACTION_SHOW_LOADING,
});

export const showError = (error) => ({
  type: ACTION_SHOW_ERROR,
  error,
});

export const inspectElement = (element) => {
  inspect(element);

  return {
    type: ACTION_INSPECT_ELEMENT,
    element,
  };
};
