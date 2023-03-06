import axios from 'axios';
import * as ProjectsTypes from '../types/ProjectsTypes';
import { API_ROUTES } from '../config/ProjectsConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ProjectsTypes.LOADING,
  payload: value,
});

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllProjects.route,
      method: API_ROUTES?.getAllProjects?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: ProjectsTypes?.GET_ALL__PROJECTS,
      payload: res?.data?.projects,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createProjects = (data, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createProjects?.route,
      method: API_ROUTES?.createProjects?.method,
      needToken: true,

      // body: data,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ProjectsTypes?.CREATE_PROJECTS,
        payload: res?.data?.projects,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
      dispatch(getAllProjects());
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

export const deleteProjects =
  (id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting) => async (dispatch) => {
    console.log(id);
    try {
      setDeleting(true);
      const res = await httpRequest({
        url: API_ROUTES?.deleteProjects?.route + id,
        method: API_ROUTES?.deleteProjects?.method,
        needToken: true,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setDeleting(false);
        dispatch({
          type: ProjectsTypes?.DELETE_PROJECTS,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProjects());
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

export const editProjects =
  (id, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing) => async (dispatch) => {
    console.log(id);
    try {
      setEditing(true);
      const res = await httpRequest({
        url: API_ROUTES?.editProjects?.route + id,
        method: API_ROUTES?.editProjects?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        setEditing(false);
        dispatch({
          type: ProjectsTypes?.EDIT_PROJECTS,
          payload: res?.data?.roles,
        });
        setSuccessMessage(res?.data?.message);
        setOpen(true);
        dispatch(getAllProjects());
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
