import * as Redux from 'redux';
import { IGroupDTO, IGroups } from '../interfaces';

export const SET_GROUP_ATTRIBUTE: string = 'SET_GROUP_ATTRIBUTE';
export const SET_GROUPS: string = 'SET_GROUPS';

export interface ISetGroupAttribute extends Redux.Action {
  readonly groups: Partial<IGroups>;
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
