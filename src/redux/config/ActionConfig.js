const API_ROUTES = {
  getAllAction: {
    route: '/action',
    method: 'get',
  },

  createAction: {
    route: '/action/create/',
    method: 'post',
  },

  editAction: {
    route: '/action/',
    method: 'patch',
  },

  deleteAction: {
    route: '/action/',
    method: 'delete',
  },

  getActionById: {
    route: '/action/by/',
    method: 'get',
  },
};

export { API_ROUTES };
