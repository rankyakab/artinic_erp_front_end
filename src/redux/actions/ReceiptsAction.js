import axios from 'axios';
import * as ReceiptsTypes from '../types/ReceiptsType';
import { API_ROUTES } from '../config/ReceiptsConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ReceiptsTypes.LOADING,
  payload: value,
});

export const getAllReceipts = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllReceipts?.route,
      method: API_ROUTES?.getAllReceipts?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ReceiptsTypes?.ALL_RECEIPTS,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createReceipt = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createReceipts?.route,
      method: API_ROUTES?.createReceipts?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ReceiptsTypes?.CREATE_RECEIPTS,
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

export const editReceipt = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updateReceipts?.route,
      method: API_ROUTES?.updateReceipts?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ReceiptsTypes?.UPDATE_RECEIPTS,
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
