import * as Redux from 'redux';
import { IGroupDTO } from '../interfaces';

export const SET_GROUP_ATTRIBUTE: string = 'SET_GROUP_ATTRIBUTE';
export const SET_GROUPS_LIST: string = ' SET_GROUPS_LIST';

export interface ISetGroupAttribute extends Redux.Action {
  readonly selectedGroupID: number;
}

export interface ISetGroupsList extends Redux.Action {
  readonly  groupsList: IGroupDTO[];
}

export function setGroupAttribute(selectedGroupID: number): ISetGroupAttribute {
  return { type: SET_GROUP_ATTRIBUTE, selectedGroupID };
}

export function setGroupsList(groupsList: IGroupDTO[]): ISetGroupsList {
  return { type: SET_GROUPS_LIST, groupsList };
}
