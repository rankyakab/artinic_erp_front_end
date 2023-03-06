import axios from 'axios';
import * as ProtypeTypes from '../types/ProtypeTypes';
import { API_ROUTES } from '../config/ProtypeConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ProtypeTypes.LOADING,
  payload: value,
});

export const getAllProtype = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllProtype.route,
      method: API_ROUTES?.getAllProtype?.method,
      needToken: true,
    });

    console.log(res?.data?.projectType);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: ProtypeTypes?.GET_ALL__PROTYPE,
      payload: res?.data?.projectType,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createProtype = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createProtype?.route,
      method: API_ROUTES?.createProtype?.method,
      needToken: true,

      // body: data,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ProtypeTypes?.CREATE_PROTYPE,
        payload: res?.data?.projectType,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllProtype());
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
    setErrorMessage(error?.data?.message);
    setError(true);
  } finally {
    setIsLoading(false);
  }
};

export const deleteProtype =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteProtype?.route + id,
        method: API_ROUTES?.deleteProtype?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: ProtypeTypes?.DELETE_PROTYPE,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProtype());
      }
    } catch (error) {
      console.log(error);
      setDeleting(false);
      setErrorMessage(error?.data?.message);
      setError(true);
    } finally {
      setDeleting(false);
    }
  };

export const editProtype =
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing) => async (dispatch) => {
    console.log(id);
    try {
      setEditing(true);
      const res = await httpRequest({
        url: API_ROUTES?.editProtype?.route + id,
        method: API_ROUTES?.editProtype?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setEditing(false);
        dispatch({
          type: ProtypeTypes?.EDIT_PROTYPE,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProtype());
      }
    } catch (error) {
      console.log(error);
      setEditing(false);
      setErrorMessage(error?.data?.message);
      setError(true);
    } finally {
      setEditing(false);
    }
  };
