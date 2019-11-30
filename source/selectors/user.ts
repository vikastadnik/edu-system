
import { USER_ROLES } from '../enums';

// tslint:disable-next-line:typedef
export const isUserStudent = (state) => state?.auth?.role === USER_ROLES.STUDENT;
