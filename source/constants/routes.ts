import { IAppRoute } from '../interfaces';
import { GroupsAndStudentList } from '../components/groups-and-student-list';

export const ADMIN_APP_ROUTES: IAppRoute[] = [
  {
    caption: 'Student Management',
    path: '/student-management',
    exact: true
  },
  {
    caption: 'Groups Management',
    path: '/groups-management',
    component: GroupsAndStudentList,
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
