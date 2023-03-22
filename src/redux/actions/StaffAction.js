import axios from 'axios';
import * as StaffTypes from '../types/StaffTypes';
import { API_ROUTES } from '../config/StaffConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: StaffTypes.LOADING,
  payload: value,
});

export const getAllStaffs = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllStaffs.route,
      method: API_ROUTES?.getAllStaffs?.method,
      needToken: true,
    });

    console.log(res);

    dispatch(setIsLoading(false));
    dispatch({
      type: StaffTypes?.GET_ALL_STAFF,
      payload: res?.data?.staffs,
    });
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getStaffById = async (id) => {
  try {
    const res = await httpRequest({
      url: API_ROUTES?.getStaffById?.route + id,
      method: API_ROUTES?.getStaffById?.method,
      needToken: true,
    });
    console.log(res);
    return Promise.resolve(res?.data?.staffs);
  } catch (error) {
    console.log(error);
  }

  return {};
};

export const convertStaffToUser =
  (id, setOpen, setSuccessMessage, setError, setErrorMessage, setLoading) => async (dispatch) => {
    setLoading(true);
    try {
      const res = await httpRequest({
        url: API_ROUTES?.covertStaffToUser?.route + id,
        method: API_ROUTES?.covertStaffToUser?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        dispatch({
          type: StaffTypes?.CONVERT_STAFF_TO_USER,
          payload: res?.data,
        });
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

export const createStaff = (data, setOpen, setError, setErrorMessage, isFormData) => async (dispatch) => {
  try {
    console.log(data);
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.createStaff.route,
      method: API_ROUTES?.createStaff.method,
      needToken: true,
      // body: data,
      data,
      header: isFormData
        ? {
            'Access-Control-Allow-Origin': '*',
            mode: 'no-cors',
            'Content-Type': 'multipart/form-data',
          }
        : false,
      isFormData,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: StaffTypes?.CREATE_STAFF,
        payload: res?.data,
      });
      setOpen(true);
      dispatch(getAllStaffs());
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const editStaff =
  (data, id, setOpen, setError, setErrorMessage, setSuccessMessage, isFormData) => async (dispatch) => {
    try {
      console.log("this is the data to be logied in ", data);
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editStaff?.route + id,
        method: API_ROUTES?.editStaff?.method,
        needToken: true,
        // body: data,
        data,
        header: isFormData
          ? {
              'Access-Control-Allow-Origin': '*',
              mode: 'no-cors',
              'Content-Type': 'multipart/form-data',
            }
          : false,
        isFormData,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: StaffTypes?.EDIT_STAFF,
          payload: res?.data,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllStaffs());
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };
