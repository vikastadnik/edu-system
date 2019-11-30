import { createActions } from 'redux-actions';

export const FETCH_START = 'teachers@FETCH_START';
export const FETCH_SUCCESS = 'teachers@FETCH_SUCCESS';
export const FETCH_ERROR = 'teachers@FETCH_ERROR';

export const ADD_START = 'teachers@ADD_START';
export const ADD_SUCCESS = 'teachers@ADD_SUCCESS';
export const ADD_ERROR = 'teachers@ADD_ERROR';

export const DELETE_START = 'teachers@DELETE_START';
export const DELETE_SUCCESS = 'teachers@DELETE_SUCCESS';
export const DELETE_ERROR = 'teachers@DELETE_ERROR';

export const {
  teachersFetchStart,
  teachersFetchSuccess,
  teachersFetchError,

  teachersAddStart,
  teachersAddSuccess,
  teachersAddError,

  teachersDeleteStart,
  teachersDeleteSuccess,
  teachersDeleteError

} = createActions(
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_START,
  ADD_SUCCESS,
  ADD_ERROR,
  DELETE_ERROR,
  DELETE_START,
  DELETE_SUCCESS
);
