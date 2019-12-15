import * as a from './index';
import { StudentAPI } from '../../api/student-api';

export const fetchStudents = () => (dispatch) => {
  dispatch(a.studentsFetchStart());
  return StudentAPI.getAllStudents()
    .then((resp) => dispatch(a.studentsFetchSuccess(resp)))
    .catch((err) => dispatch(a.studentsFetchError(err)));
};
//
// export const addStudent = (data) => (dispatch) => {
//   dispatch(a.studentsAddStart());
//   return GroupApi.createGroup(data)
//     .then((resp) => dispatch(a.studentsAddSuccess(resp)))
//     .catch((err) => dispatch(a.studentsAddError(err)));
// };
//
// export const deleteGroup = (uuid) => async (dispatch) => {
//   dispatch(a.studentsDeleteStart());
//   try {
//     await GroupApi.deleteGroup(uuid);
//     dispatch(a.studentsDeleteSuccess(uuid));
//   } catch (err) {
//     dispatch(a.studentsDeleteError(err));
//   }
// };
