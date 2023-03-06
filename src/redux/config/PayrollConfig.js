const API_ROUTES = {
  getAllPayslip: {
    route: '/payslip',
    method: 'get',
  },

  getSinglePayslip: {
    route: '/payslip/single',
    method: 'get',
  },

  getCurrentUserPayslip: {
    route: '/payslip/mypayslip',
    method: 'get',
  },

  createPayslip: {
    route: '/payslip/create',
    method: 'post',
  },

  editPayslip: {
    route: '/payslip/',
    method: 'patch',
  },

  deletePayslip: {
    route: '/payslip/',
    method: 'delete',
  },

  getPayslipById: {
    route: '/payslip/by/',
    method: 'get',
  },

  //   Position
  getAllPositions: {
    route: '/positions',
    method: 'get',
  },

  getSinglePosition: {
    route: '/positions/single',
    method: 'get',
  },

  createPosition: {
    route: '/positions/create',
    method: 'post',
  },

  updatePosition: {
    route: '/positions/patch',
    method: 'patch',
  },

  deletePosition: {
    route: '/positions/destroy',
    method: 'get',
  },

  //   Allowance
  getAllAllowances: {
    route: '/allowance',
    method: 'get',
  },

  getSingleAllowance: {
    route: '/allowance/single',
    method: 'get',
  },

  createAllowance: {
    route: '/allowance/create',
    method: 'post',
  },

  updateAllowance: {
    route: '/allowance/patch',
    method: 'patch',
  },

  deleteAllowance: {
    route: '/allowance/destroy',
    method: 'get',
  },

  //   Bonuses
  getAllBonuses: {
    route: '/bonuses/',
    method: 'get',
  },

  getSingleBonus: {
    route: '/bonuses/single',
    method: 'get',
  },

  createBonus: {
    route: '/bonuses/create',
    method: 'post',
  },

  updateBonus: {
    route: '/bonuses/patch',
    method: 'patch',
  },

  deleteBonus: {
    route: '/bonuses/destroy',
    method: 'get',
  },

  //   Allowed Deduction
  getAllDeductions: {
    route: '/deduction',
    method: 'get',
  },

  getSingleDeduction: {
    route: '/deduction/single',
    method: 'get',
  },

  createAllowedDeduction: {
    route: '/deduction/create',
    method: 'post',
  },

  updateDeduction: {
    route: '/deduction/patch',
    method: 'patch',
  },

  deleteDeduction: {
    route: '/deduction/destroy',
    method: 'get',
  },

  //   Staff Deduction
  getAllStaffDeductions: {
    route: '/employee_deduction/',
    method: 'get',
  },

  getSingleStaffDeduction: {
    route: '/employee_deduction/single',
    method: 'get',
  },

  createStaffDeduction: {
    route: '/employee_deduction/create',
    method: 'post',
  },

  updateStaffDeduction: {
    route: '/employee_deduction/patch',
    method: 'patch',
  },

  deleteStaffDeduction: {
    route: '/employee_deduction/destroy',
    method: 'get',
  },

  //   Employer Deduction
  getAllEmployerDeductions: {
    route: '/employer_deduction/',
    method: 'get',
  },

  getSingleEmployerDeduction: {
    route: '/employer_deduction/single',
    method: 'get',
  },

  createEmployerDeduction: {
    route: '/employer_deduction/create',
    method: 'post',
  },

  updateEmployerDeduction: {
    route: '/employer_deduction/patch',
    method: 'patch',
  },

  deleteEmployerDeduction: {
    route: '/employer_deduction/destroy',
    method: 'get',
  },
};

export { API_ROUTES };
