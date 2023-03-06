import axios from 'axios';
import * as TrainingTypes from '../types/TrainingTypes';
import { API_ROUTES } from '../config/TrainingConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: TrainingTypes.LOADING,
  payload: value,
});

export const getAllTraining = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllTraining.route,
      method: API_ROUTES?.getAllTraining?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: TrainingTypes?.GET_ALL__TRAINING,
      payload: res?.data?.capacityBuilding,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createTraining = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createTraining?.route,
      method: API_ROUTES?.createTraining?.method,
      needToken: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbmt5YWthYkBnbWFpbC5jb20iLCJfaWQiOiI2Mzg5N2I1OThjYTMwOGEyZGMxOWViNTkiLCJpYXQiOjE2NzE1ODgzMTZ9.xZxYlXU-zNvHpsQ9ETM9lOQ6DtFbGS21aN1Yy0TG-OU',
      data,
      // body: data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: TrainingTypes?.CREATE_TRAINING,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
