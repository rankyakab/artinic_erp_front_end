import axios from 'axios';
import * as ExpensesTypes from '../types/ExpensesTypes';
import { API_ROUTES } from '../config/ExpensesConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: ExpensesTypes.LOADING,
  payload: value,
});

export const getAllExpenditures = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getAllExpenditures?.route,
      method: API_ROUTES?.getAllExpenditures?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ExpensesTypes?.ALL_EXPENDITURES,
        payload: res?.data?.expenditures,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const getSingleExpenditure = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES?.getSingleExpenditure.route + id,
      method: API_ROUTES?.getSingleExpenditure?.method,
      needToken: true,
    });

    console.log(res);

    if (res.status === 200 || res.status === 201) {
      dispatch(setIsLoading(false));
      dispatch({
        type: ExpensesTypes?.GET_SINGLE_EXPENDITURE,
        payload: res?.data?.expenditure,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};
