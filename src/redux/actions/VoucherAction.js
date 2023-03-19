import axios from 'axios';
import * as VoucherTypes from '../types/VoucherTypes';
import { API_ROUTES } from '../config/VoucherConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: VoucherTypes.LOADING,
  payload: value,
});

export const getAllVoucher = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllVoucher?.route,
      method: API_ROUTES?.getAllVoucher?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: VoucherTypes?.GET_ALL_VOUCHER,
        payload: res?.data?.voucher,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateVoucher = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updateVoucher?.route,
      method: API_ROUTES?.updateVoucher?.method,
      needToken: true,
      data,
      // body: data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: VoucherTypes?.UPDATE_VOUCHER,
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

export const createVoucher = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createVoucher?.route,
      method: API_ROUTES?.createVoucher?.method,
      needToken: true,
      data,
      // body: data,
    });

   // console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: VoucherTypes?.CREATE_VOUCHER,
        payload: res?.data,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
   // console.log(error);
    dispatch(setIsLoading(false));
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};
