export * from './user-roles';
export * from './courses';

export type MODE = 'EDIT' | 'ADD';

export enum MODES {
  EDIT = 'EDIT',
  ADD = 'ADD'
}

export enum CARD_TYPES {
  INFO = 'INFO',
  TEST = 'TEST'
}

export enum CARD_TYPES_TITLES {
  INFO = 'Інформаційний кадр',
  TEST = 'Тестовий кадр'
}
