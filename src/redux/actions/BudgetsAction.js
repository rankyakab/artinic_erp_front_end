import axios from 'axios';
import * as BudgetsTypes from '../types/BudgetsTypes';
import { API_ROUTES } from '../config/BudgetConfig';
import { httpRequest } from '../../helpers/index';

export const setIsLoading = (value) => ({
  type: BudgetsTypes.LOADING,
  payload: value,
});

export const getAllBudgets = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await httpRequest({
      url: API_ROUTES.getAllBudgets.route,
      method: API_ROUTES?.getAllBudgets?.method,
      needToken: true,
    });

    console.log(res);

    // if (res.status === 200 || res.status === 201) {
    dispatch(setIsLoading(false));
    dispatch({
      type: BudgetsTypes?.GET_ALL__BUDGETS,
      payload: res?.data?.budgets,
    });
    // }
  } catch (error) {
    console.log(error);
  }
};
