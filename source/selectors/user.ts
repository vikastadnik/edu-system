import { USER_ROLES } from '../enums';

export const isUserStudent = (state) => state?.auth?.role === USER_ROLES.STUDENT;
export const isTeacher = (state) => state?.auth?.role === USER_ROLES.TEACHER;
export const isAdmin = (state) => state?.auth?.role === USER_ROLES.ADMIN;
