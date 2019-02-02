import React from 'react';
import { shallow } from 'enzyme';
import RulesItem from '../../../../../src/ui/redux/components/RulesItem';

describe('<RulesItem />', () => {
  describe('#render', () => {
    it('should render without side-effects', () => {
      const rule = { missingClassName: '.foo', selector: '.bar' };
      const node = shallow(<RulesItem rule={rule} inspectElement={() => {}} />);

      expect(node).toMatchSnapshot();
    });
  });
});
