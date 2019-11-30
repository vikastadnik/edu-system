import * as a from './index';
import { SpecialityApi } from '../../api/speciality-api';

export const fetchSpecialities = () => (dispatch) => {
  dispatch(a.specialitiesFetchStart());
  return SpecialityApi.getSpecialitiesList()
    .then((resp) => dispatch(a.specialitiesFetchSuccess(resp)))
    .catch((err) => dispatch(a.specialitiesFetchError(err)));
};

export const addSpecialities = (data) => (dispatch) => {
  dispatch(a.specialitiesAddStart());
  return SpecialityApi.addSpeciality(data)
    .then((resp) => dispatch(a.specialitiesAddSuccess(resp)))
    .catch((err) => dispatch(a.specialitiesAddError(err)));
};

// export const deleteSubject = (uuid) => async (dispatch) => {
//   dispatch(a.specialitiesDeleteStart());
//   try {
//     await SubjectApi.deleteSubject(uuid);
//     dispatch(a.specialitiesDeleteSuccess(uuid));
//   } catch (err) {
//     dispatch(a.specialitiesDeleteError(err));
//   }
// };
