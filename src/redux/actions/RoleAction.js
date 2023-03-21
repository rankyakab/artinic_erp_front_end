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

export const getRoleById = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getRoleById?.route+id,
      method: API_ROUTES?.getRoleById?.method,
      needToken: true,
    });

    console.log("please work",res);

    localStorage.setItem('role', JSON.stringify(res?.data?.role[0][0]));

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: RoleTypes?.GET_ALL_ROLES_BY_ID,
        payload: res?.data?.role,
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

export const editRole =
  (data, id, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
   
    try {
      // console.log(data);
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editRole?.route + id,
        method: API_ROUTES?.editRole?.method,
        needToken: true,
        // body: data,
        data,
        
      });

     // console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: RoleTypes?.EDIT_ROLE,
          payload: res?.data,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllRole());
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

