import { createActions } from 'redux-actions';

export const FETCH_START = 'groups@FETCH_START';
export const FETCH_SUCCESS = 'groups@FETCH_SUCCESS';
export const FETCH_ERROR = 'groups@FETCH_ERROR';

export const FETCH_STUDENT_SUCCESS = 'groups@FETCH_STUDENT_SUCCESS';

export const ADD_START = 'groups@ADD_START';
export const ADD_SUCCESS = 'groups@ADD_SUCCESS';
export const ADD_ERROR = 'groups@ADD_ERROR';

export const DELETE_START = 'groups@DELETE_START';
export const DELETE_SUCCESS = 'groups@DELETE_SUCCESS';
export const DELETE_ERROR = 'groups@DELETE_ERROR';

export const SELECT = 'groups@SELECT';

export const {
  groupsFetchStart,
  groupsFetchSuccess,
  groupsFetchError,

  groupsAddStart,
  groupsAddSuccess,
  groupsAddError,

  groupsDeleteStart,
  groupsDeleteSuccess,
  groupsDeleteError,

  groupsSelect,
  groupStudentFetchSuccess

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
  SELECT,
  FETCH_STUDENT_SUCCESS
);
