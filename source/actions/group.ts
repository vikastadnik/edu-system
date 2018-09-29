import * as Redux from 'redux';
import { IGroup } from '../interfaces';

export const SET_GROUP_ATTRIBUTE: string = 'SET_GROUP_ATTRIBUTE';

export interface ISetGroupAttribute extends Redux.Action {
  readonly group: Partial<IGroup>;
}

export function setGroupAttribute(group: Partial<IGroup>): ISetGroupAttribute {
  return {type: SET_GROUP_ATTRIBUTE, group};
}
