import * as a from '.';
import { TeacherApi } from '../../api/teacher-api';

export const fetchTeachers = () => (dispatch) => {
  dispatch(a.teachersFetchStart());
  return TeacherApi.getTeacherList()
    .then((resp) => dispatch(a.teachersFetchSuccess(resp)))
    .catch((err) => dispatch(a.teachersFetchError(err)));
};

export const addTeacher = (data) => (dispatch) => {
  dispatch(a.teachersAddStart());
  return TeacherApi.createTeacher(data)
    .then((resp) => dispatch(a.teachersAddSuccess(resp)))
    .catch((err) => dispatch(a.teachersAddError(err)));
};

export const deleteTeacher = (uuid) => async (dispatch) => {
  dispatch(a.teachersDeleteStart());
  try {
    await TeacherApi.deleteTeacher(uuid);
    dispatch(a.teachersDeleteSuccess(uuid));
  } catch (err) {
    dispatch(a.teachersDeleteError(err));
  }
};
