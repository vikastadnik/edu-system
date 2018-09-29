import * as Actions from '../actions';
import { IGroup } from '../interfaces';

export type ActionType = Actions.Group.ISetGroupAttribute;

const initialState: IGroup = {
  id: null,
  data: {},
  loading: false,
  selectedStudentID: null,
  students: []
};

export function group(state: IGroup = initialState, action: ActionType): IGroup {
  switch (action.type) {
    case Actions.Group.SET_GROUP_ATTRIBUTE:
      return {...state, ...action.group};
    default:
      return state;
  }
}
