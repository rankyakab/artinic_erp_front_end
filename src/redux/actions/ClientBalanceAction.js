import axios from 'axios';
import * as ClientBalanceTypes from '../types/ClientBalanceTypes';
import { API_ROUTES } from '../config/ClientBalanceConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ClientBalanceTypes.LOADING,
  payload: value,
});

export const getAllBalances = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllClientBalance.route,
      method: API_ROUTES?.getAllClientBalance?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.ALL_CLIENT_BALANCE,
        payload: res?.data,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getAllPayments = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllClientPayment?.route,
      method: API_ROUTES?.getAllClientPayment?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.ALL_CLIENT_PAYMENT,
        payload: res?.data?.payments,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getSingleClientPayment = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleClientPayment?.route,
      method: API_ROUTES?.getSingleClientPayment?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_SINGLE_CLIENT_PAYMENT,
        payload: res?.data?.payment,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getSingleClientBalance = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getClientSingleBalance?.route,
      method: API_ROUTES?.getClientSingleBalance?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_SINGLE_CLIENT_BALANCE,
        payload: res?.data?.balance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getClientBalanceByClientId = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getClientBalanceByClientId?.route,
      method: API_ROUTES?.getClientBalanceByClientId?.method,
      needToken: true,
      data: {
        clientId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_CLIENT_BALANCE_BY_CLIENTID,
        payload: res?.data?.balance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getClientPaymentByClientId = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getClientPaymentByClientId?.route,
      method: API_ROUTES?.getClientPaymentByClientId?.method,
      needToken: true,
      data: {
        clientId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_CLIENT_PAYMENT_BY_CLIENTID,
        payload: res?.data?.payment,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getClientBalanceByProjectId = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getClientBalanceByProjectId?.route,
      method: API_ROUTES?.getClientBalanceByProjectId?.method,
      needToken: true,
      data: {
        projectId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_CLIENT_BALANCE_BY_PROJECTID,
        payload: res?.data?.balance,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getClientPaymentByProjectId = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getClientBalanceByProjectId?.route,
      method: API_ROUTES?.getClientBalanceByProjectId?.method,
      needToken: true,
      data: {
        projectId: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.GET_CLIENT_PAYMENT_BY_PROJECTID,
        payload: res?.data?.payment,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteClientPayment = (id, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteClientPayment?.route,
      method: API_ROUTES?.deleteClientPayment?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.DELETE_CLIENT_PAYMENT,
        payload: res?.data?.payment,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteClientBalance = (id, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.deleteClientBalance?.route,
      method: API_ROUTES?.deleteClientBalance?.method,
      needToken: true,
      data: {
        _id: id,
      },
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.DELETE_CLIENT_BALANCE,
        payload: res?.data?.balance,
      });
      setOpen(true);
      setSuccessMessage(res?.data?.message);
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const addClientPayment = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.addClientPayment?.route,
      method: API_ROUTES?.addClientPayment?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.CREATE_CLIENT_PAYMENT,
        payload: res?.data?.payment,
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

export const addClientBalance = (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
  console.log(data);
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.addClientBalance?.route,
      method: API_ROUTES?.addClientBalance?.method,
      needToken: true,
      data,
    });

    console.log(res);
    console.log(data);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ClientBalanceTypes?.CREATE_CLIENT_BALANCE,
        payload: res?.data?.balance,
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

export const updateClientPayment =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editClientPayment?.route,
        method: API_ROUTES?.editClientPayment?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: ClientBalanceTypes?.UPDATE_CLIENT_PAYMENT,
          payload: res?.data,
        });
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const updateClientBalance =
  (data, setOpen, setError, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    console.log(data);
    try {
      dispatch(setIsLoading(true));
      const res = await httpRequest({
        url: API_ROUTES?.editClientBalance?.route,
        method: API_ROUTES?.editClientBalance?.method,
        needToken: true,
        data,
      });

      console.log(res);

      if (res.status === 200 || res.status === 201) {
        dispatch(setIsLoading(false));
        dispatch({
          type: ClientBalanceTypes?.UPDATE_CLIENT_BALANCE,
          payload: res?.data,
        });
        setOpen(true);
        setSuccessMessage(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
      setError(true);
      setErrorMessage(error?.data?.message || 'Something went wrong try again later');
    } finally {
      dispatch(setIsLoading(false));
    }
  };
