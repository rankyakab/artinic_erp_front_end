import axios from 'axios';
import * as MaintenanceTypes from '../types/MaintenanceTypes';
import { API_ROUTES } from '../config/MaintenanceConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: MaintenanceTypes.LOADING,
  payload: value,
});

export const getAllScheduledMaintenance = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllScheduledMaintenance.route,
      method: API_ROUTES?.getAllScheduledMaintenance?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: MaintenanceTypes?.GET_ALL_SCHEDULED_MAINTENANCE,
      payload: res?.data?.maintenance,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const createMaintenance = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.createMaintenance?.route,
      method: API_ROUTES?.createMaintenance?.method,
      needToken: true,
      data,
      // body: data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MaintenanceTypes?.CREATE_MAINTENANCE,
        payload: res?.data,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getAllAssets = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllAssets.route,
      method: API_ROUTES?.getAllAssets?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MaintenanceTypes?.GET_ALL_ASSET,
        payload: res?.data?.assets,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllvendors = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllVendors.route,
      method: API_ROUTES?.getAllVendors?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: MaintenanceTypes?.GET_ALL_VENDORS,
        payload: res?.data?.vendors,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
