const API_ROUTES = {
  // Payment
  getAllClientPayment: {
    route: '/clientpayment',
    method: 'get',
  },

  getClientSinglePayment: {
    route: '/clientpayment/single',
    method: 'get',
  },

  addClientPayment: {
    route: '/clientpayment/create',
    method: 'post',
  },

  editClientPayment: {
    route: '/clientpayment/patch',
    method: 'patch',
  },

  deleteClientPayment: {
    route: '/clientpayment/destory',
    method: 'delete',
  },

  getClientPaymentByClientId: {
    route: '/clientpayment/client',
    method: 'get',
  },

  getClientPaymentByProjectId: {
    route: '/clientpayment/project',
    method: 'get',
  },

  // Balance
  getAllClientBalance: {
    route: '/clientpayment/balances',
    method: 'get',
  },

  getClientSingleBalance: {
    route: '/clientpayment/',
    method: 'get',
  },

  addClientBalance: {
    route: '/client/create',
    method: 'post',
  },

  editClientBalance: {
    route: '/client/',
    method: 'patch',
  },

  deleteClientBalance: {
    route: '/balance/',
    method: 'delete',
  },

  getClientBalanceByClientId: {
    route: '/clientpayment/clientbalance',
    method: 'get',
  },

  getClientBalanceByProjectId: {
    route: '/clientpayment/projectbalance',
    method: 'get',
  },
};

export { API_ROUTES };
