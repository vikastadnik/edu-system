import * as React from 'react';
import { IGroupManagementConnectProps as IProps } from './groups-list-container';
import { GroupListView } from '../../components/group-list-view/group-list-view';
import * as Actions from '../../actions';
import { autobind } from 'core-decorators';

export class GroupsList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  @autobind
  public onSelect(groupID: number): void {
    this.props.dispatch(Actions.Group.setGroupAttribute({id: groupID}));
  }

  public render(): JSX.Element {
    return (
      <GroupListView onSelect={this.onSelect}/>
    );
  }
}
