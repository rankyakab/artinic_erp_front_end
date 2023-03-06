import axios from 'axios';
import * as ClientsTypes from '../types/ClientsTypes';
import { API_ROUTES } from '../config/ClientsConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ClientsTypes.LOADING,
  payload: value,
});

export const getAllClients = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllClients.route,
      method: API_ROUTES?.getAllClients?.method,
      needToken: true,
    });

    console.log(res?.data?.clients, 'clients');

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: ClientsTypes?.GET_ALL__CLIENTS,
      payload: res?.data?.clients,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createClients = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createClients?.route,
      method: API_ROUTES?.createClients?.method,
      needToken: true,

      // body: data,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientsTypes?.CREATE_CLIENTS,
        payload: res?.data?.clients,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllClients());
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

export const deleteClients =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteClients?.route + id,
        method: API_ROUTES?.deleteClients?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: ClientsTypes?.DELETE_CLIENTS,
          payload: res?.data,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllClients());
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

export const editClients =
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing) => async (dispatch) => {
    console.log(id);
    try {
      setEditing(true);
      const res = await httpRequest({
        url: API_ROUTES?.editClients?.route + id,
        method: API_ROUTES?.editClients?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setEditing(false);
        dispatch({
          type: ClientsTypes?.EDIT_CLIENTS,
          payload: res?.data,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllClients());
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
