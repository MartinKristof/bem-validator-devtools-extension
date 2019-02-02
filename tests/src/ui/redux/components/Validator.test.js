import React from 'react';
import { shallow } from 'enzyme';
import Validator from '../../../../../src/ui/redux/components/Validator';

describe('<Validator />', () => {
  const inspectElement = jest.fn();

  describe('#render', () => {
    it('should render if rules are valid according BEM', () => {
      const node = shallow(
        <Validator rules={[]} isBemDetected isValid loading={false} inspectElement={inspectElement} error={null} />,
      );

      expect(node).toMatchSnapshot();
    });

    it('should render if rules are invalid according BEM', () => {
      const rules = [{ missingClassName: '.foo', selector: '.bar' }, { missingClassName: '.boo', selector: '.bazz' }];

      const node = shallow(
        <Validator
          rules={rules}
          isBemDetected
          isValid={false}
          loading={false}
          inspectElement={inspectElement}
          error={null}
        />,
      );

      expect(node).toMatchSnapshot();
    });

    it('should render if BEM is not detected', () => {
      const node = shallow(
        <Validator
          rules={[]}
          isBemDetected={false}
          isValid={false}
          loading={false}
          inspectElement={inspectElement}
          error={null}
        />,
      );

      expect(node).toMatchSnapshot();
    });

    it('should render if loading', () => {
      const node = shallow(
        <Validator
          rules={[]}
          isBemDetected={false}
          isValid={false}
          loading
          inspectElement={inspectElement}
          error={null}
        />,
      );

      expect(node).toMatchSnapshot();
    });

    it('should render if error', () => {
      const node = shallow(
        <Validator
          rules={[]}
          isBemDetected={false}
          isValid={false}
          loading={false}
          inspectElement={inspectElement}
          error="Error"
        />,
      );

      expect(node).toMatchSnapshot();
    });
  });
});
