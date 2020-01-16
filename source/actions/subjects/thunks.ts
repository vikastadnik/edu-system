import * as a from '.';
import { SubjectApi } from '../../api/subject-api';
import { CARD_TYPES } from '../../enums';

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

export const setCurrentSubject = (data) => (dispatch) => {
  dispatch(a.subjectsFetchStart());
  return SubjectApi.getSubjectByID(data)
    .then((resp) => dispatch(a.subjectsSetCurrentSubject(resp)))
    .catch((err) => dispatch(a.subjectsFetchError(err)));
};

export const addCardToSubject = (data) => (dispatch) => {
  dispatch(a.subjectsAddStart());
  return data.type === CARD_TYPES.INFO
    ? SubjectApi.createInfoCard(data)
    : SubjectApi.creatTestCard(data)
      .then((resp) => dispatch(a.subjectsAddCardToCurrentSubject(resp)))
      .catch((err) => dispatch(a.subjectsFetchError(err)));
};

export const addTaskToSubject = (data) => (dispatch) => {
  dispatch(a.subjectsAddStart());
  return SubjectApi.createTask(data)
      .then((resp) => dispatch(a.subjectsAddTask(resp)))
      .catch((err) => dispatch(a.subjectsFetchError(err)));
};

export const setCurrentTestCard = (data) => (dispatch) => {
  dispatch(a.subjectsFetchStart());
  return SubjectApi.getTestCard(data)
    .then((resp) => dispatch(a.subjectsSetCurrentCard(resp)))
    .catch((err) => dispatch(a.subjectsFetchError(err)));
};
