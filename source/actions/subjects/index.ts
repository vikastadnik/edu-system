import { createActions } from 'redux-actions';

export const FETCH_START = 'subjects@FETCH_START';
export const FETCH_SUCCESS = 'subjects@FETCH_SUCCESS';
export const FETCH_ERROR = 'subjects@FETCH_ERROR';

export const ADD_START = 'subjects@ADD_START';
export const ADD_SUCCESS = 'subjects@ADD_SUCCESS';
export const ADD_ERROR = 'subjects@ADD_ERROR';

export const DELETE_START = 'subjects@DELETE_START';
export const DELETE_SUCCESS = 'subjects@DELETE_SUCCESS';
export const DELETE_ERROR = 'subjects@DELETE_ERROR';

export const SET_CURRENT_SUBJECT = 'subjects@SET_CURRENT_SUBJECT';
export const ADD_CARD_TO_CURRENT_SUBJECT = 'subjects@ADD_CARD_TO_CURRENT_SUBJECT';
export const ADD_TEST_TO_CURRENT_SUBJECT = 'subjects@ADD_CARD_TO_CURRENT_SUBJECT';
export const SET_CURRENT_CARD = 'subjects@SET_CURRENT_CARD';
export const ADD_TASK = 'subjects@ADD_TASK';

export const {
  subjectsFetchStart,
  subjectsFetchSuccess,
  subjectsFetchError,

  subjectsAddStart,
  subjectsAddSuccess,
  subjectsAddError,

  subjectsSetCurrentSubject,
  subjectsAddCardToCurrentSubject,
  subjectsSetCurrentCard,
  subjectsAddTask,
}
  = createActions(
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  ADD_START,
  ADD_SUCCESS,
  ADD_ERROR,
  SET_CURRENT_SUBJECT,
  ADD_CARD_TO_CURRENT_SUBJECT,
  SET_CURRENT_CARD,
  ADD_TASK
);
