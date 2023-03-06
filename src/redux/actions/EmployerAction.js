import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllEmployerDeduction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllEmployerDeductions?.route,
      method: API_ROUTES?.getAllEmployerDeductions?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_EMPLOYER_DEDUCTION,
        payload: res?.data?.employerDeduction,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEmployerDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleEmployerDeduction?.route,
      method: API_ROUTES?.getSingleEmployerDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_SINGLE_EMPLOYER_DEDUCTION,
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

export const deleteEmployerDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteEmployerDeduction?.route,
      method: API_ROUTES?.deleteEmployerDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_EMPLOYER_DEDUCTION,
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

export const createEmployerDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.createEmployerDeduction?.route,
        method: API_ROUTES?.createEmployerDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);
      console.log(data);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.CREATE_EMPLOYER_DEDUCTION,
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

export const updateEmployerDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.updateEmployerDeduction?.route,
        method: API_ROUTES?.updateEmployerDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.EDIT_EMPLOYER_DEDUCTION,
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
