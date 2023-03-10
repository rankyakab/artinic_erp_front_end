const API_ROUTES = {
  getAllRole: {
    route: '/role',
    method: 'get',
  },

  createRole: {
    route: '/role/create',
    method: 'post',
  },

  editRole: {
    route: '/role/',
    method: 'patch',
  },

  deleteRole: {
    route: '/role/',
    method: 'delete',
  },

  getRoleById: {
    route: '/role/by/',
    method: 'get',
  },
};

export { API_ROUTES };
