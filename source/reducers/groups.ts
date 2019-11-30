import * as Actions from '../actions';
import { IGroupDTO, IGroups } from '../interfaces';

export type ActionType = Actions.Groups.ISetGroupAttribute & Actions.Groups.ISetGroups & Actions.Groups.IDeleteGroup;

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
    case Actions.Groups.DELETE_GROUP:
      // tslint:disable-next-line:no-shadowed-variable
      const groups: IGroupDTO[] = state.groupsList
        .filter((group: IGroupDTO) => group.uuid !== action.group);
      return { ...state, groupsList: groups };
    default:
      return state;
  }
}
