import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllPositions = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllPositions?.route,
      method: API_ROUTES?.getAllPositions?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_POSITION,
        payload: res?.data?.positions,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePosition = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSinglePosition.route,
      method: API_ROUTES?.getSinglePosition?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_SINGLE_POSITION,
        payload: res?.data?.position,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deletePosition = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deletePosition.route,
      method: API_ROUTES?.deletePosition?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_POSITION,
        payload: res?.data?.position,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCurrentUserPosition = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getCurrentUserPosition.route,
      method: API_ROUTES?.getCurrentUserPosition?.method,
      needToken: true,
      data: {
        staffId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_CURRENT_USER_POSITION,
        payload: res?.data?.position,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createPosition = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createPosition?.route,
      method: API_ROUTES?.createPosition?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.CREATE_POSITION,
        payload: res?.data?.position,
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

export const updatePosition = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updatePosition?.route,
      method: API_ROUTES?.updatePosition?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.EDIT_POSITION,
        payload: res?.data,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};
