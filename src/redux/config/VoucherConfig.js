const API_ROUTES = {
  getAllVoucher: {
    route: '/voucher',
    method: 'get',
  },

  createVoucher: {
    route: '/voucher/create',
    method: 'post',
  },

  singleVoucher: {
    route: '/voucher/single',
    method: 'get',
  },

  sentVoucher: {
    route: '/voucher/sentvoucher',
    method: 'get',
  },

  destroyVoucher: {
    route: '/voucher/destroy',
    method: 'delete',
  },

  updateVoucher: {
    route: '/voucher/edit',
    method: 'patch',
  },
};

export { API_ROUTES };
