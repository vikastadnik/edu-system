import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { IGroupDTO, IState } from '../../interfaces';
import { GroupsList } from './groups-list';

export interface IGroupListStoreProps {
  readonly userRole: string;
  readonly groups: IGroupDTO[];
}

export type IGroupManagementConnectProps = IGroupListStoreProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState): IGroupListStoreProps {
  return { userRole: state.auth.role, groups: state.groups.groupsList };
}

export const GroupsListContainer: React.ComponentClass = ReactRedux.connect(mapStateToProps)(GroupsList);
