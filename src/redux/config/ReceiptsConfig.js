const API_ROUTES = {
  getAllReceipts: {
    route: '/receipts',
    method: 'get',
  },

  createReceipts: {
    route: '/receipts/create',
    method: 'post',
  },

  updateReceipts: {
    route: '/receipts/patch',
    method: 'patch',
  },

  deleteReceipts: {
    route: '/receipts/destroy',
    method: 'delete',
  },

  getReceiptsById: {
    route: '/receipts/single',
    method: 'get',
  },

  getReceiptsStatusTotal: {
    route: '/receipts/status/total',
    method: 'get',
  },

  getReceiptsStatusSingle: {
    route: 'receipts/client/count/',
    method: 'get',
  },
};

export { API_ROUTES };
