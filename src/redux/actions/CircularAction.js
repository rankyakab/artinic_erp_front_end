import axios from 'axios';
import * as CircularTypes from '../types/CircularTypes';
import { API_ROUTES } from '../config/CiircularConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: CircularTypes.LOADING,
  payload: value,
});

export const getAllCirculars = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllCirculars.route,
      method: API_ROUTES?.getAllCirculars?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: CircularTypes?.GET_ALL_CIRCULARS,
      payload: res?.data?.circular,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createCircular = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createCircular?.route,
      method: API_ROUTES?.createCircular?.method,
      needToken: true,

      // body: data,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CircularTypes?.CREATE_CIRCULAR,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
