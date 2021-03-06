import { IAppRoute } from '../interfaces';
import GroupsAndStudentList from '../components/groups-and-student-list';
import Subject from '../components/subjects/subject/subject';
import SubjectList from '../components/subjects/subject-list/subject-list';
import TeachersList from '../components/teachers/teachers-list';
import SpecialitiesList from '../components/specialities/speciality-list';
import StudentList from '../components/students/students-list';

export const ADMIN_APP_ROUTES: IAppRoute[] = [
  {
    caption: 'Студенти',
    path: '/student-management',
    component: StudentList,
    exact: true
  },
  {
    caption: 'Groups Management',
    path: '/groups-management',
    component: GroupsAndStudentList,
    exact: true
  },
  {
    caption: 'Факультети',
    path: '/speciality-management',
    component: SpecialitiesList,
    exact: true
  },
  {
    caption: 'Вчителі',
    path: '/teachers',
    component: TeachersList,
    exact: true
  },
  {
    caption: 'Предмети',
    path: '/subjects',
    component: SubjectList,
    exact: true,
    routes: [
      {
        path: '/:subjectId',
        caption: 'Предмет',
        component: Subject
      }
    ]
  }
];

export const SUBJECT: string = '/subjects/:subjectId';

export const ADD_INFO_CARD: string = '/subjects/:subjectId/add-info-card';

export const LOOK_INFO_CARD: string = '/subjects/:subjectId/info-card/:cardId';
export const LOOK_TEST_CARD: string = '/subjects/:subjectId/test-card/:cardId';

export const TEACHER_APP_ROUTES: IAppRoute[] = [
  {
    caption: 'Group Management',
    path: '/manage-groups',
    exact: true
  }
];
