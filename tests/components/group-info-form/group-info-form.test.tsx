import * as React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { GroupInfoForm } from '../../../source/components/group-info-form';
import { IGroupDTO } from '../../../source/interfaces';
import { Input } from 'semantic-ui-react';

describe('Group info form', () => {
  const onChange: jest.Mock = jest.fn();
  const groupInfo: IGroupDTO = {
    name: 'ICIT-141',
    course: 1,
    faculty: 'ICIT'
  };

  it('should render without crashes', () => {
    const groupInfoForm: ShallowWrapper =
      shallow(<GroupInfoForm data={groupInfo} loading={false} onChange={onChange}/>);
    expect(groupInfoForm).toMatchSnapshot();
  });

  it('should display passed group information', () => {
    const groupInfoForm: ReactWrapper =
      mount(<GroupInfoForm data={groupInfo} loading={false} onChange={onChange}/>);
    expect(groupInfoForm.find(Input).at(1).value).toBe(groupInfo.name);
  });
});
