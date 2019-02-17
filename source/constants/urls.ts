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
    login: '/api/users/session'
  },
  group: {
    getGroupsList: '/api/groups'
  },
  student: {
    createStudent: '/api/students'
  }
};
