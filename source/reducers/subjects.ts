import { ISubjects, IUser } from '../interfaces';
import { handleActions } from 'redux-actions';
import { remove } from 'lodash-es';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  ADD_ERROR,
  ADD_SUCCESS,
  ADD_START,
  DELETE_SUCCESS,
  DELETE_START,
  DELETE_ERROR
} from '../actions/subjects';

export const initialState: ISubjects = {
  list: [],
  fetching: false,
  error: null
};

export const subjects = handleActions({
  [FETCH_START]: (state) => ({
    ...state,
    error: null,
    fetching: true
  }),
  [FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    fetching: false,
    list: payload || []
  }),
  [FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: payload,
  }),
  [ADD_START]: (state) => ({
    ...state,
    error: null,
    fetching: true
  }),
  [ADD_SUCCESS]: (state, { payload }) => ({
    ...state,
    fetching: false,
    listS: [...state.list, payload]
  }),
  [ADD_ERROR]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: payload,
  }),
  [DELETE_START]: (state) => ({
    ...state,
    error: null,
    fetching: true
  }),
  [DELETE_SUCCESS]: (state, { payload }) => ({
    ...state,
    fetching: false,
    list: remove(state.list, (t: IUser) => t.uuid !== payload)
  }),
  [DELETE_ERROR]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: payload,
  })
}, initialState);
