// import axios from 'axios';
import * as DepartmentTypes from '../types/DepartmentTypes';
import { API_ROUTES } from '../config/DepartmentConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: DepartmentTypes.LOADING,
  payload: value,
});

export const getAllDepartment = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllDepartment?.route,
      method: API_ROUTES?.getAllDepartment?.method,
      needToken: true,
    });

  console.log("this is the response if any",res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: DepartmentTypes?.GET_ALL_DEPARTMENTS,
        payload: res?.data?.departments,
      });
    }
  } catch (error) {
    dispatch(setIsLoading(false));
   // console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  //  setIsLoading(false);
  }
};

export const createDepartment = (data, setErrorMessage, setSuccessMessage, setOpen, setError,setEditId) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createDepartment?.route,
      method: API_ROUTES?.createDepartment?.method,
      needToken: true,
      data,
    });

   // console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: DepartmentTypes?.CREATE_DEPARTMENT,
        payload: res?.data?.department,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllDepartment());
       setEditId('')
    }
  } catch (error) {
 //   console.log(error);

 dispatch(setIsLoading(false));
   // setIsLoading(false);
    setErrorMessage(error?.data?.message);
    setEditId('');
    setError(true);
  } finally {
    dispatch(setIsLoading(false));
    setEditId('')
  }
};

export const deleteDepartment =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteDepartment?.route + id,
        method: API_ROUTES?.deleteDepartment?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: DepartmentTypes?.DELETE_DEPARTMENT,
          payload: res?.data?.department,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllDepartment());
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

export const editDepartment=
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing, setEditId) => async (dispatch) => {
    // console.log(id);
     
    try {
      setEditing(true);
       dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editDepartment?.route + id,
        method: API_ROUTES?.editDepartment?.method,
        needToken: true,
        data,
      });

     // console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        setEditing(false);
        setEditId("")
        dispatch({
          type: DepartmentTypes?.EDIT_DEPARTMENT,
          payload: res?.data?.department,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllDepartment());
      }
    } catch (error) {
     // console.log(error);
     dispatch(setIsLoading(false));
      setEditing(false);
      setErrorMessage(error?.data?.message);
      setError(true);
      setEditId('')
    } finally {
      setEditing(false);
      dispatch(setIsLoading(false));
    }
  };
