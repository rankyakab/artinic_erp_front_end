// import axios from 'axios';
import * as RoleTypes from '../types/RoleTypes';
import { API_ROUTES } from '../config/RoleConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: RoleTypes.LOADING,
  payload: value,
});

export const getAllRole = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllRole?.route,
      method: API_ROUTES?.getAllRole?.method,
      needToken: true,
    });

   // console.log(res);

    localStorage.setItem('roles', JSON.stringify(res?.data?.roles));

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: RoleTypes?.GET_ALL_ROLES,
        payload: res?.data?.roles,
      });
    }
  } catch (error) {
   // console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const createRole = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createRole?.route,
      method: API_ROUTES?.createRole?.method,
      needToken: true,
      data,
    });

   //  console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: RoleTypes?.CREATE_ROLE,
        payload: res?.data?.roles,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllRole());
    }
  } catch (error) {
   // console.log(error);
    setIsLoading(false);
    setErrorMessage(error?.data?.message);
    setError(true);
  } finally {
    setIsLoading(false);
  }
};

export const deleteRole = (id, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteRole?.route + id,
      method: API_ROUTES?.deleteRole?.method,
      needToken: true,
    });

   // console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: RoleTypes?.DELETE_ROLE,
        payload: res?.data?.roles,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllRole());
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
