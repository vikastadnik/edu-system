export const API_URL_CONFIG: {
  readonly auth: {
    readonly login: string;
  },
  readonly group: {
    readonly getGroupsList: string;
  },
  readonly student: {
    readonly  createStudent: string
  }
} = {
  auth: {
    login: '/users/session'
  },
  group: {
    getGroupsList: '/groups'
  },
  student: {
    createStudent: '/students'
  }
};
