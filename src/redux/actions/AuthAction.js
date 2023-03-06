import { httpRequest } from '../../helpers/index';
import { API_ROUTES } from '../config/AuthConfig';
import * as AuthTypes from '../types/AuthTypes';
import { getAllRole } from './RoleAction';

export const setIsLoading = (value) => ({
  type: AuthTypes.LOADING,
  payload: value,
});

export const loginUser = (data, navigate, setEmail, setPassword, setSuccess) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.login?.route,
      method: API_ROUTES?.login?.method,
      needToken: false,
      data,
      // body: data,
    });

    console.log(res);
    console.log(data);

    localStorage.setItem('token', JSON.stringify(res?.data?.token));
    localStorage.setItem('user', JSON.stringify(res?.data));

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.LOGIN,
        payload: res?.data,
      });

      setSuccess(true);
      setEmail('');
      setPassword('');
      navigate('/dashboard/one');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setIsLoading(false));
  }
};
