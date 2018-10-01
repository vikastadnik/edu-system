import * as Redux from 'redux';
import { IGroups } from '../interfaces';

export const SET_GROUP_ATTRIBUTE: string = 'SET_GROUP_ATTRIBUTE';

export interface ISetGroupAttribute extends Redux.Action {
  readonly groups: Partial<IGroups>;
}

export function setGroupAttribute(groups: Partial<IGroups>): ISetGroupAttribute {
  return { type: SET_GROUP_ATTRIBUTE, groups };
}
