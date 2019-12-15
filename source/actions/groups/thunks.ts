import * as a from './index';
import { GroupApi } from '../../api';

export const fetchGroups = () => (dispatch) => {
  dispatch(a.groupsFetchStart());
  return GroupApi.getGroupsList()
    .then((resp) => dispatch(a.groupsFetchSuccess(resp)))
    .catch((err) => dispatch(a.groupsFetchError(err)));
};

export const fetchGroupStudentList = () => (dispatch, getState) => {
  const uuid = getState().groups.selectedUuid;
  if (!uuid) return null;
  dispatch(a.groupsFetchStart());
  return GroupApi.getGroupStudentList(uuid)
    .then((resp) => dispatch(a.groupsFetchStudentSuccess(resp)))
    .catch((err) => dispatch(a.groupsFetchError(err)));
};

export const addGroup = (data) => (dispatch) => {
  dispatch(a.groupsAddStart());
  return GroupApi.createGroup(data)
    .then((resp) => dispatch(a.groupsAddSuccess(resp)))
    .catch((err) => dispatch(a.groupsAddError(err)));
};

export const deleteGroup = (uuid) => async (dispatch) => {
  dispatch(a.groupsDeleteStart());
  try {
    await GroupApi.deleteGroup(uuid);
    dispatch(a.groupsDeleteSuccess(uuid));
  } catch (err) {
    dispatch(a.groupsDeleteError(err));
  }
};
