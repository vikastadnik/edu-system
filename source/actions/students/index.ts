import { createActions } from 'redux-actions';

export const FETCH_START = 'students@FETCH_START';
export const FETCH_SUCCESS = 'students@FETCH_SUCCESS';
export const FETCH_ERROR = 'students@FETCH_ERROR';

export const ADD_START = 'students@ADD_START';
export const ADD_SUCCESS = 'students@ADD_SUCCESS';
export const ADD_ERROR = 'students@ADD_ERROR';

export const DELETE_START = 'students@DELETE_START';
export const DELETE_SUCCESS = 'students@DELETE_SUCCESS';
export const DELETE_ERROR = 'students@DELETE_ERROR';

export const {
  studentsFetchStart,
  studentsFetchSuccess,
  studentsFetchError,

  studentsAddStart,
  studentsAddSuccess,
  studentsAddError,

  studentsDeleteStart,
  studentsDeleteSuccess,
  studentsDeleteError,
  studentsFetchStudentSuccess

} = createActions(
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_START,
  ADD_SUCCESS,
  ADD_ERROR,
  DELETE_ERROR,
  DELETE_START,
  DELETE_SUCCESS,
);
