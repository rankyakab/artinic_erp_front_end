import axios from 'axios';
import * as ActionTypes from '../types/ActionTypes';
import { API_ROUTES } from '../config/ActionConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ActionTypes.LOADING,
  payload: value,
});

export const getAllAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllAction?.route,
      method: API_ROUTES?.getAllAction?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ActionTypes?.GET_ALL_ACTIONS,
        payload: res?.data?.actions,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const createAction = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createAction?.route,
      method: API_ROUTES?.createAction?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ActionTypes?.CREATE_ACTION,
        payload: res?.data?.action,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllAction());
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

export const deleteAction =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteAction?.route + id,
        method: API_ROUTES?.deleteAction?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: ActionTypes?.DELETE_ACTION,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllAction());
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

export const editAction =
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing) => async (dispatch) => {
    console.log(id);
    try {
      setEditing(true);
      const res = await httpRequest({
        url: API_ROUTES?.editAction?.route + id,
        method: API_ROUTES?.editAction?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setEditing(false);
        dispatch({
          type: ActionTypes?.EDIT_ACTION,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllAction());
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
