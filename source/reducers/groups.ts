import * as Actions from '../actions';
import { IGroups } from '../interfaces';

export type ActionType = Actions.Groups.ISetGroupAttribute & Actions.Groups.ISetGroups;

const initialState: IGroups = {
  groupsList: [],
  selectedGroupID: null,
};

export function groups(state: IGroups = initialState, action: ActionType): IGroups {
  switch (action.type) {
    case Actions.Groups.SET_GROUP_ATTRIBUTE:
      return { ...state, ...action.groups };
    case Actions.Groups.SET_GROUPS:
      return { ...state, groupsList: action.groupList };
    default:
      return state;
  }
}
