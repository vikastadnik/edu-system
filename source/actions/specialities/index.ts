import { createActions } from 'redux-actions';

export const FETCH_START = 'specialities@FETCH_START';
export const FETCH_SUCCESS = 'specialities@FETCH_SUCCESS';
export const FETCH_ERROR = 'specialities@FETCH_ERROR';

export const ADD_START = 'specialities@ADD_START';
export const ADD_SUCCESS = 'specialities@ADD_SUCCESS';
export const ADD_ERROR = 'specialities@ADD_ERROR';

export const DELETE_START = 'specialities@DELETE_START';
export const DELETE_SUCCESS = 'specialities@DELETE_SUCCESS';
export const DELETE_ERROR = 'specialities@DELETE_ERROR';

export const {
  specialitiesFetchStart,
  specialitiesFetchSuccess,
  specialitiesFetchError,

  specialitiesAddStart,
  specialitiesAddSuccess,
  specialitiesAddError,

  specialitiesDeleteStart,
  specialitiesDeleteSuccess,
  specialitiesDeleteError

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
