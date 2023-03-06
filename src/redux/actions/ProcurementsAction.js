import axios from 'axios';
import * as ProcurementsTypes from '../types/ProcurementsTypes';
import { API_ROUTES } from '../config/ProcurementsConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ProcurementsTypes.LOADING,
  payload: value,
});

export const getAllProcurements = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllProcurements.route,
      method: API_ROUTES?.getAllProcurements?.method,
      needToken: true,
    });

    console.log(res?.data?.procurement, 'pro res');

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: ProcurementsTypes?.GET_ALL__PROCUREMENTS,
      payload: res?.data?.procurement,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createProcurements = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createProcurements?.route,
      method: API_ROUTES?.createProcurements?.method,
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
        type: ProcurementsTypes?.CREATE_PROCUREMENTS,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
