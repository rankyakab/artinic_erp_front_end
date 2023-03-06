import axios from 'axios';
import * as InvoicesTypes from '../types/InvoiceTypes';
import { API_ROUTES } from '../config/InvoiceConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: InvoicesTypes.LOADING,
  payload: value,
});

export const getAllInvoices = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllInvoice?.route,
      method: API_ROUTES?.getAllInvoice?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: InvoicesTypes?.ALL_INVOICE,
        payload: res?.data?.invoices,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleInvoice = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getInvoicesById.route + id,
      method: API_ROUTES?.getInvoicesById?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: InvoicesTypes?.GET_SINGLE_INVOICE,
        payload: res?.data?.invoices,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createInvoices = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createInvoices?.route,
      method: API_ROUTES?.createInvoices?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: InvoicesTypes?.CREATE_INVOICE,
        payload: res?.data?.invoices,
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

export const updateInvoices = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.updateInvoices?.route,
      method: API_ROUTES?.updateInvoices?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: InvoicesTypes?.UPDATE_INVOICE,
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
