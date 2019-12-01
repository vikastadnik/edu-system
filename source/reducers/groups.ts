import { IGroupDTO, IGroups } from '../interfaces';
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
  DELETE_ERROR, SELECT, FETCH_STUDENT_SUCCESS
} from '../actions/groups';

export const initialState: IGroups = {
  list: [],
  fetching: false,
  error: null,
  selectedUuid: '',
  studentList: []
};

export const groups = handleActions({
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
    list: remove(state.list, (g: IGroupDTO) => g.uuid !== payload)
  }),
  [DELETE_ERROR]: (state, { payload }) => ({
    ...state,
    fetching: false,
    error: payload,
  }),
  [SELECT]: (state, { payload }) => ({
    ...state,
    selectedUuid: payload
  }),
  [FETCH_STUDENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    studentList: payload || []
  })
}, initialState);
