import * as a from '.';
import { SubjectApi } from '../../api/subject-api';

export const fetchSubjects = () => (dispatch) => {
  dispatch(a.subjectsFetchStart());
  return SubjectApi.getSubjectList()
    .then((resp) => dispatch(a.subjectsFetchSuccess(resp)))
    .catch((err) => dispatch(a.subjectsFetchError(err)));
};

export const addSubject = (data) => (dispatch) => {
  dispatch(a.subjectsAddStart());
  return SubjectApi.createSubject(data)
    .then((resp) => dispatch(a.subjectsAddSuccess(resp)))
    .catch((err) => dispatch(a.subjectsAddError(err)));
};

// export const deleteSubject = (uuid) => async (dispatch) => {
//   dispatch(a.subjectsDeleteStart());
//   try {
//     await SubjectApi.deleteSubject(uuid);
//     dispatch(a.subjectsDeleteSuccess(uuid));
//   } catch (err) {
//     dispatch(a.subjectsDeleteError(err));
//   }
// };
