import axios from 'axios';
import * as LogisticsTypes from '../types/LogisticsTypes';
import { API_ROUTES } from '../config/LogisticsConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: LogisticsTypes.LOADING,
  payload: value,
});

export const getAllLogistics = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllLogistics.route,
      method: API_ROUTES?.getAllLogistics?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: LogisticsTypes?.GET_ALL__LOGISTICS,
      payload: res?.data?.logistics,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createLogistics = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createLogistics?.route,
      method: API_ROUTES?.createLogistics?.method,
      needToken: true,

      data,
      // body: data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: LogisticsTypes?.CREATE_LOGISTICS,
        payload: res?.data,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};
