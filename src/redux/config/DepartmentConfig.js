const API_ROUTES = {
  getAllDepartment: {
    route: '/department',
    method: 'get',
  },

  createDepartment: {
    route: '/department/create/',
    method: 'post',
  },

  editDepartment: {
    route: '/department/',
    method: 'patch',
  },

  deleteDepartment: {
    route: '/department/',
    method: 'delete',
  },

  getDepartmentById: {
    route: '/department/by/',
    method: 'get',
  },
};

export { API_ROUTES };
