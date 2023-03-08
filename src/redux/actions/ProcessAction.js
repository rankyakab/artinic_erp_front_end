// import axios from 'axios';
import * as ProcessTypes from '../types/ProcessTypes';
import { API_ROUTES } from '../config/ProcessConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ProcessTypes.LOADING,
  payload: value,
});

export const getAllProcess = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllProcess?.route,
      method: API_ROUTES?.getAllProcess?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ProcessTypes?.GET_ALL_PROCESS,
        payload: res?.data?.processes,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const createProcess = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createProcess?.route,
      method: API_ROUTES?.createProcess?.method,
      needToken: true,
      data,
    });

   // console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ProcessTypes?.CREATE_PROCESS,
        payload: res?.data?.process,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllProcess());
    }
  } catch (error) {
   // console.log(error);
   // setIsLoading(false);
   // dispatch(setIsLoading(true));
    dispatch(setIsLoading(false));
    setErrorMessage(error?.data?.message);
    setError(true);
  } finally {
  //  setIsLoading(false);
    dispatch(setIsLoading(false));
  }
};

export const deleteProcess =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteProcess?.route + id,
        method: API_ROUTES?.deleteProcess?.method,
        needToken: true,
      });

     // console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: ProcessTypes?.DELETE_PROCESS,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProcess());
      }
    } catch (error) {
     // console.log(error);
      setDeleting(false);
      setErrorMessage(error?.data?.message);
      setError(true);
    } finally {
      setDeleting(false);
    }
  };

export const editProcess =
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing) => async (dispatch) => {
   // console.log(id);
    try {
      setEditing(true);
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editProcess?.route + id,
        method: API_ROUTES?.editProcess?.method,
        needToken: true,
        data,
      });

   //   console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        setEditing(false);
        dispatch({
          type: ProcessTypes?.EDIT_PROCESS,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProcess());
      }
    } catch (error) {
     // console.log(error);
     dispatch(setIsLoading(false));
      setEditing(false);
      setErrorMessage(error?.data?.message);
      setError(true);
    } finally {
      setEditing(false);
      dispatch(setIsLoading(false));
    }
  };
