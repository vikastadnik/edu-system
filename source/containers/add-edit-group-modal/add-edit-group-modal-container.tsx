import * as React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { IGroupDTO, IState } from '../../interfaces';
import { AddEditGroupModal } from './add-edit-group-modal';

export interface IAddEditGroupModalStoreProps {
  readonly mode: 'ADD' | 'EDIT';
  readonly selectedGroupID: number;
  readonly groupList: IGroupDTO[];
}

export type IAddEditGroupModalConnectedProps = IAddEditGroupModalStoreProps & ReactRedux.DispatchProp<Redux.Action>;

export function mapStateToProps(state: IState, ownProps: { mode: 'ADD' | 'EDIT' }): IAddEditGroupModalStoreProps {
  return { groupList: state.groups.groupsList, selectedGroupID: state.groups.selectedGroupID, mode: ownProps.mode };
}

export const AddEditGroupModalContainer: React.ComponentClass<{ mode: 'ADD' | 'EDIT' }> =
  ReactRedux.connect(mapStateToProps)(AddEditGroupModal);
