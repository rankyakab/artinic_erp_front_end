import * as PayrollTypes from '../types/PayrollTypes';

const initialState = {
  payroll_Loading: false,
  api_error: '',
  payrolls: [],
  singlePayroll: [],
  currentUserPayroll: [],
  createPayroll: '',

  // payslip
  payslips: [],
  singlePayslip: [],
  currentUserPayslip: [],
  createPayslip: '',

  // position
  positions: [],
  singlePosition: [],
  currentUserPosition: [],
  createPosition: '',

  // aloowance
  allowances: [],
  singleAllowance: [],
  currentUserAllowance: [],
  createAllowance: '',

  // bonuses
  bonuses: [],
  singleBonus: [],
  currentUserBonus: [],
  createBonus: '',

  // allowed deduction
  allowedDeduction: [],
  singleAllowedDeduction: [],
  currentUserAllowedDeduction: [],
  createAllowedDeduction: '',

  // Staff deduction
  staffDeduction: [],
  singleStaffDeduction: [],
  currentUserStaffDeduction: [],
  createStaffDeduction: '',

  // Employer deduction
  employerDeduction: [],
  singleEmployerDeduction: [],
  currentUserEmployerDeduction: [],
  createEmployerDeduction: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PayrollTypes?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PayrollTypes?.GET_ALL_PAYROLL:
      return {
        ...state,
        payrolls: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_PAYROLL:
      return {
        ...state,
        currentUserPayroll: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_PAYROLL:
      return {
        ...state,
        singlePayroll: action.payload,
      };

    case PayrollTypes?.CREATE_PAYROLL:
      return {
        ...state,
        createPayroll: action.payload,
      };

    //   Payslip
    case PayrollTypes?.GET_ALL_PAYSLIP:
      return {
        ...state,
        payslips: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_PAYSLIP:
      return {
        ...state,
        currentUserPayslip: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_PAYSLIP:
      return {
        ...state,
        singlePayslip: action.payload,
      };

    case PayrollTypes?.CREATE_PAYSLIP:
      return {
        ...state,
        createPayslip: action.payload,
      };

    //   position
    case PayrollTypes?.GET_ALL_POSITION:
      return {
        ...state,
        positions: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_POSITION:
      return {
        ...state,
        currentUserPosition: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_POSITION:
      return {
        ...state,
        singlePosition: action.payload,
      };

    case PayrollTypes?.CREATE_POSITION:
      return {
        ...state,
        createPosition: action.payload,
      };

    //   Allowance
    case PayrollTypes?.GET_ALL_ALLOWANCE:
      return {
        ...state,
        allowances: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_ALLOWANCE:
      return {
        ...state,
        currentUserAllowance: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_ALLOWANCE:
      return {
        ...state,
        singleAllowance: action.payload,
      };

    case PayrollTypes?.CREATE_ALLOWANCE:
      return {
        ...state,
        createAllowance: action.payload,
      };

    //   Allowance
    case PayrollTypes?.GET_ALL_BONUSES:
      return {
        ...state,
        bonuses: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_BONUS:
      return {
        ...state,
        currentUserBonuse: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_BONUS:
      return {
        ...state,
        singleBonuse: action.payload,
      };

    case PayrollTypes?.CREATE_BONUS:
      return {
        ...state,
        createBonuse: action.payload,
      };

    //   allowed Deduction
    case PayrollTypes?.GET_ALL_ALLOWED_DEDUCTION:
      return {
        ...state,
        allowedDeduction: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_ALLOWED_DEDUCTION:
      return {
        ...state,
        currentUserallowedDeduction: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_ALLOWED_DEDUCTION:
      return {
        ...state,
        singleAllowedDeduction: action.payload,
      };

    case PayrollTypes?.CREATE_ALLOWED_DEDUCTION:
      return {
        ...state,
        createAllowedDeduction: action.payload,
      };

    //   Staff Deduction
    case PayrollTypes?.GET_ALL_EMPLOYEE_DEDUCTION:
      return {
        ...state,
        staffDeduction: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_EMPLOYEE_DEDUCTION:
      return {
        ...state,
        currentUserStaffDeduction: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_EMPLOYEE_DEDUCTION:
      return {
        ...state,
        singleStaffDeduction: action.payload,
      };

    case PayrollTypes?.CREATE_EMPLOYEE_DEDUCTION:
      return {
        ...state,
        createStaffDeduction: action.payload,
      };

    //   Employer Deduction
    case PayrollTypes?.GET_ALL_EMPLOYER_DEDUCTION:
      return {
        ...state,
        employerDeduction: action.payload,
      };

    case PayrollTypes?.GET_CURRENT_USER_EMPLOYER_DEDUCTION:
      return {
        ...state,
        currentUserEmployerDeduction: action.payload,
      };

    case PayrollTypes?.GET_SINGLE_EMPLOYER_DEDUCTION:
      return {
        ...state,
        singleEmployerDeduction: action.payload,
      };

    case PayrollTypes?.CREATE_EMPLOYER_DEDUCTION:
      return {
        ...state,
        createEmployerDeduction: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
