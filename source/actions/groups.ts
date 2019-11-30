import * as Redux from 'redux';
import { IGroupDTO, IGroups } from '../interfaces';

export const SET_GROUP_ATTRIBUTE: string = 'SET_GROUP_ATTRIBUTE';
export const SET_GROUPS: string = 'SET_GROUPS';
export const DELETE_GROUP: string = 'DELETE_GROUP';

export interface ISetGroupAttribute extends Redux.Action {
  readonly groups: Partial<IGroups>;
}

export interface IDeleteGroup extends Redux.Action {
  readonly group: IGroupDTO;
}

export interface ISetGroups extends Redux.Action {
  readonly groupList: IGroupDTO[];
}

export function setGroupAttribute(groups: Partial<IGroups>): ISetGroupAttribute {
  return { type: SET_GROUP_ATTRIBUTE, groups };
}

export function setGroups(groupList: IGroupDTO[]): ISetGroups {
  return { type: SET_GROUPS, groupList };
}

export function deleteGroup(group: IGroupDTO): IDeleteGroup {
  return { type: DELETE_GROUP, group };
}
