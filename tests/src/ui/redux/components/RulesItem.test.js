import React from 'react';
import { shallow } from 'enzyme';
import RulesItem from '../../../../../src/ui/redux/components/RulesItem';

describe('<RulesItem />', () => {
  describe('#render', () => {
    const inspectElement = jest.fn();
    const rule = { missingClassName: '.foo', selector: '.bar' };

    it('should render without side-effects', () => {
      const node = shallow(<RulesItem rule={rule} inspectElement={inspectElement} />);

      expect(node).toMatchSnapshot();
    });

    it('should inspect element', () => {
      const node = shallow(<RulesItem rule={rule} inspectElement={inspectElement} />);

      node.find('a').simulate('click');

      expect(inspectElement).toHaveBeenCalledWith('.bar');
    });
  });
});
