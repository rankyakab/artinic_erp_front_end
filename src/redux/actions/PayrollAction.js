import axios from 'axios';
import * as PayrollTypes from '../types/PayrollTypes';
import { API_ROUTES } from '../config/PayrollConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: PayrollTypes.LOADING,
  payload: value,
});

export const getAllPayslip = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllPayslip?.route,
      method: API_ROUTES?.getAllPayslip?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_ALL_PAYSLIP,
        payload: res?.data?.payslip,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePayslip = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSinglePayslip.route,
      method: API_ROUTES?.getSinglePayslip?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_SINGLE_PAYSLIP,
        payload: res?.data?.payslip,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deletePayslip = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deletePayslip.route,
      method: API_ROUTES?.deletePayslip?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.DELETE_PAYSLIP,
        payload: res?.data?.payslip,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getCurrentUserPayslip = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getCurrentUserPayslip.route,
      method: API_ROUTES?.getCurrentUserPayslip?.method,
      needToken: true,
      data: {
        staffId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.GET_CURRENT_USER_PAYSLIP,
        payload: res?.data?.payslip,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createPayslip = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createPayslip?.route,
      method: API_ROUTES?.createPayslip?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.CREATE_PAYSLIP,
        payload: res?.data?.payslip,
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

export const updatePayslip = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updatePayslip?.route,
      method: API_ROUTES?.updatePayslip?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: PayrollTypes?.EDIT_PAYSLIP,
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
