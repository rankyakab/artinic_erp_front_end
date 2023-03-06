const API_ROUTES = {
  getAllMemo: {
    route: '/memo',
    method: 'get',
  },

  getSingleMemo: {
    route: '/memo/single/',
    method: 'get',
  },

  createMemo: {
    route: '/memo/create',
    method: 'post',
  },

  updateMemo: {
    route: '/memo/update',
    method: 'patch',
  },
  sendMemoAction: {
    route: '/action',
    method: 'post',
  },
};

export { API_ROUTES };
