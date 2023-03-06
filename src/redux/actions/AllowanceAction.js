import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllAllowances = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllAllowances?.route,
      method: API_ROUTES?.getAllAllowances?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_ALLOWANCE,
        payload: res?.data?.allowances,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAllowance = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleAllowance.route,
      method: API_ROUTES?.getSingleAllowance?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_SINGLE_ALLOWANCE,
        payload: res?.data?.allowance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteAllowance = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteAllowance.route,
      method: API_ROUTES?.deleteAllowance?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_ALLOWANCE,
        payload: res?.data?.allowance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCurrentUserAllowance = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getCurrentUserAllowance.route,
      method: API_ROUTES?.getCurrentUserAllowance?.method,
      needToken: true,
      data: {
        staffId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_CURRENT_USER_ALLOWANCE,
        payload: res?.data?.allowance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createAllowance = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createAllowance?.route,
      method: API_ROUTES?.createAllowance?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.CREATE_ALLOWANCE,
        payload: res?.data?.allowance,
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

export const updateAllowance = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updateAllowance?.route,
      method: API_ROUTES?.updateAllowance?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.EDIT_ALLOWANCE,
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
