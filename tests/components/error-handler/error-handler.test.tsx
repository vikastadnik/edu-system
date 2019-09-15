import * as React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ErrorHandler } from '../../../source/components/error-handler';
import { ERROR_MESSAGES } from '../../../source/constants';
import { Message } from 'semantic-ui-react';

describe('Error handling component', () => {

  it('should render without crashing with passed error', () => {
    const errorHandling: ShallowWrapper = shallow(<ErrorHandler error={ERROR_MESSAGES.SORRY_REQUEST_FAILED}/>);
    expect(errorHandling).toMatchSnapshot();
  });

  it('should not render without error', () => {
    const errorHandling: ReactWrapper = mount(<ErrorHandler error={''}/>);
    expect(errorHandling.find(Message)).toHaveLength(0);
  });

  it('should display passed error', () => {
    const errorHandling: ReactWrapper = mount(<ErrorHandler error={ERROR_MESSAGES.SORRY_REQUEST_FAILED}/>);
    expect(errorHandling.find(Message).text()).toBe(ERROR_MESSAGES.SORRY_REQUEST_FAILED);
  });
});
