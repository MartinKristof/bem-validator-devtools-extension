import React from 'react';
import { shallow } from 'enzyme';
import RulesList from '../../../../../src/ui/redux/components/RulesList';

jest.mock('uuid', () => {
  let value = 0;

  return () => {
    value += 1;

    return value;
  };
});

describe('<RulesList />', () => {
  describe('#render', () => {
    it('should render without side-effects', () => {
      const rules = [{ missingClassName: '.foo', selector: '.bar' }, { missingClassName: '.boo', selector: '.bazz' }];
      const node = shallow(<RulesList inspectElement={() => {}} rules={rules} />);

      expect(node).toMatchSnapshot();
    });
  });
});
