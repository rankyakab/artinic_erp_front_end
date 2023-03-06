import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllAllowedDeduction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllDeductions?.route,
      method: API_ROUTES?.getAllDeductions?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_ALLOWED_DEDUCTION,
        payload: res?.data?.deductions,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAllowedDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleDeduction?.route,
      method: API_ROUTES?.getSingleDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_SINGLE_ALLOWED_DEDUCTION,
        payload: res?.data?.deduction,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteAllowedDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteDeduction?.route,
      method: API_ROUTES?.deleteDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_ALLOWED_DEDUCTION,
        payload: res?.data?.deduction,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCurrentUserAllowedDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getCurrentUserAllowedDeduction?.route,
      method: API_ROUTES?.getCurrentUserAllowedDeduction?.method,
      needToken: true,
      data: {
        staffId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_CURRENT_USER_ALLOWED_DEDUCTION,
        payload: res?.data?.bonus,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createAllowedDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.createAllowedDeduction?.route,
        method: API_ROUTES?.createAllowedDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);
      console.log(data);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.CREATE_ALLOWED_DEDUCTION,
          payload: res?.data?.deduction,
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

export const updateAllowedDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.updateDeduction?.route,
        method: API_ROUTES?.updateDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.EDIT_ALLOWED_DEDUCTION,
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
