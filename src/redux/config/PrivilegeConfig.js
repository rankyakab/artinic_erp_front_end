const API_ROUTES = {
  getAllPrivilege: {
    route: '/privilege',
    method: 'get',
  },

  createPrivilege: {
    route: '/privilege/create',
    method: 'post',
  },

  editPrivilege: {
    route: '/privilege/',
    method: 'patch',
  },

  deletePrivilege: {
    route: '/privilege/',
    method: 'delete',
  },

  getPrivilegeById: {
    route: '/privilege/',
    method: 'get',
  },

  confirmPrivilege: {
    route: '/privilege/confirm',
    method: 'post',
  },
};

export { API_ROUTES };
