import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Validator from '../../../../../src/ui/redux/components';
import stateRecord from '../../../../../src/ui/redux/state';

const mockStore = configureMockStore();

const store = mockStore({ state: stateRecord });

describe('<index />', () => {
  describe('#render', () => {
    it('should render without side-effects', () => {
      const node = mount(
        <Provider store={store}>
          <Validator />
        </Provider>,
      );

      expect(node).toMatchSnapshot();
    });
  });
});
