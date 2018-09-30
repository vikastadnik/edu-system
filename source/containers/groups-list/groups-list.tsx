import * as React from 'react';
import { IGroupManagementConnectProps as IProps } from './groups-list-container';
import { GroupListView } from '../../components/group-list-view/group-list-view';
import * as Actions from '../../actions';
import { autobind } from 'core-decorators';
import { IGroupDTO } from '../../interfaces';
import { GroupApi } from '../../api';
import { AxiosError } from 'axios';

export class GroupsList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      groupsList: [],
      error: null,
    };
  }

  public async componentDidMount(): Promise<void> {
    try {
      this.setState({ loading: true });
      const groupsList: IGroupDTO[] = await GroupApi.getGroupsList();
      this.setState({ groupsList, loading: false });
      this.props.dispatch(Actions.Groups.setGroupsList(groupsList));
    } catch (error) {
      this.setState({ error });
    }
  }

  @autobind
  public onSelect(selectedGroupID: number): void {
    this.props.dispatch(Actions.Groups.setGroupAttribute(selectedGroupID));
  }

  public render(): JSX.Element {
    return (
      <GroupListView {...this.state} onSelect={this.onSelect}/>
    );
  }
}

export interface IState {
  readonly loading: boolean;
  readonly groupsList: IGroupDTO[];
  readonly error: AxiosError;
}
