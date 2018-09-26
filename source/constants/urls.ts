export const API_URL_CONFIG: {
  readonly auth: {
    readonly login: string;
  },
  readonly group: {
    readonly getGroupsList: string;
  }
} = {
  auth: {
    login: '/api/users/login'
  },
  group: {
    getGroupsList: '/api/groups'
  }
};
