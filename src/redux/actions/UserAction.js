import axios from 'axios';
import * as UserTypes from '../types/UserTypes';
import { API_ROUTES } from '../config/UserConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: UserTypes.LOADING,
  payload: value,
});

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllUser.route,
      method: API_ROUTES?.getAllUser?.method,
      needToken: true,
    });

    console.log(res?.data?.users, 'works');

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: UserTypes?.GET_ALL__USER,
      payload: res?.data?.users,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const EditUser = (data, id, setErrorMessage, setSuccessMessage, setOpen, setError) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.editUser?.route + id,
      method: API_ROUTES?.editUser?.method,
      needToken: true,
      data,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: UserTypes?.EDIT_USER,
        payload: res?.data?.roles,
      });
      setSuccessMessage(res?.data?.message);
      setOpen(true);
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
