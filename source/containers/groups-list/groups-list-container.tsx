import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { IGroups, IState } from '../../interfaces';
import { GroupsList } from './groups-list';

export interface IGroupListStoreProps {
  readonly userRole: string;
  readonly group: IGroups;
}

export type IGroupManagementConnectProps = IGroupListStoreProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState): IGroupListStoreProps {
  return { userRole: state.auth.role, group: state.groups };
}

export const GroupsListContainer: React.ComponentClass = ReactRedux.connect(mapStateToProps)(GroupsList);
