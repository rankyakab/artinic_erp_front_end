const API_ROUTES = {
  getAllInvoice: {
    route: '/invoices',
    method: 'get',
  },

  createInvoices: {
    route: '/invoices/create',
    method: 'post',
  },

  updateInvoices: {
    route: '/invoices/patch',
    method: 'patch',
  },

  deleteInvoices: {
    route: '/invoices/destroy',
    method: 'delete',
  },

  getInvoicesById: {
    route: '/invoices/single',
    method: 'get',
  },

  getInvoicesStatusTotal: {
    route: '/invoices/status/total',
    method: 'get',
  },

  getInvoicesStatusSingle: {
    route: 'invoices/client/count/',
    method: 'get',
  },
};

export { API_ROUTES };
