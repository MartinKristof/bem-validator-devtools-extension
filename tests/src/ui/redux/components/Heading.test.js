import React from 'react';
import { shallow } from 'enzyme';
import Heading from '../../../../../src/ui/redux/components/Heading';

describe('<Heading />', () => {
  describe('#render', () => {
    it('should render without side-effects', () => {
      const node = shallow(<Heading>Foo</Heading>);

      expect(node).toMatchSnapshot();
    });
  });
});
