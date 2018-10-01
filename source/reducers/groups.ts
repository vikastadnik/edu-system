import * as Actions from '../actions';
import { IGroups } from '../interfaces';

export type ActionType = Actions.Groups.ISetGroupAttribute;

const initialState: IGroups = {
  groupsList: [],
  selectedGroupID: null,
  selectedGroupStudents: [],
  selectedStudentID: null
};

export function groups(state: IGroups = initialState, action: ActionType): IGroups {
  switch (action.type) {
    case Actions.Groups.SET_GROUP_ATTRIBUTE:
      return { ...state, ...action.groups };
    default:
      return state;
  }
}
