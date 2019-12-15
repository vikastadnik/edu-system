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
  DELETE_ERROR, SET_CURRENT_SUBJECT, ADD_CARD_TO_CURRENT_SUBJECT,
} from '../actions/subjects';

export const initialState: ISubjects = {
  list: [],
  fetching: false,
  error: null,
  currentSubject: null
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
    list: [...state.list, payload]
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
  }),
  [SET_CURRENT_SUBJECT]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: null,
    currentSubject: payload
  }),
  [ADD_CARD_TO_CURRENT_SUBJECT]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: null,
    currentSubject: {
      ...state.currentSubject,
      cards: [
        ...state.currentSubject.cards,
        payload
      ]
    }
  })
}, initialState);
