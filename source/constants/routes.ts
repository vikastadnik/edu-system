import { IAppRoute } from '../interfaces';

export const ADMIN_APP_ROUTES: IAppRoute[] = [
  {
    caption: 'Student Management',
    path: '/manage-students',
    exact: true
  },
  {
    caption: 'Group Management',
    path: '/manage-groups',
    exact: true
  }
];
export const TEACHER_APP_ROUTES: IAppRoute[] = [
  {
    caption: 'Group Management',
    path: '/manage-groups',
    exact: true
  }
];
