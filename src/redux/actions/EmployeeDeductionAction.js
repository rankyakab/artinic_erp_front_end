import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllEmployeeDeduction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllStaffDeductions?.route,
      method: API_ROUTES?.getAllStaffDeductions?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_EMPLOYEE_DEDUCTION,
        payload: res?.data?.employeeDeduction,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEmployeeDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleStaffDeduction?.route,
      method: API_ROUTES?.getSingleStaffDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_EMPLOYEE_DEDUCTION,
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

export const deleteEmployeeDeduction = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteStaffDeduction?.route,
      method: API_ROUTES?.deleteStaffDeduction?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_EMPLOYEE_DEDUCTION,
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

export const createEmployeeDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.createStaffDeduction?.route,
        method: API_ROUTES?.createStaffDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);
      console.log(data);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.CREATE_EMPLOYEE_DEDUCTION,
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

export const updateEmployeeDeduction =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.updateStaffDeduction?.route,
        method: API_ROUTES?.updateStaffDeduction?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: PayrollTypes?.EDIT_EMPLOYEE_DEDUCTION,
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
