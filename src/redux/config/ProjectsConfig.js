const API_ROUTES = {
  getAllProjects: {
    route: '/project',
    method: 'get',
  },

  createProjects: {
    route: '/project/create',
    method: 'post',
  },

  deleteProjects: {
    route: '/project/',
    method: 'delete',
  },

  editProjects: {
    route: '/project/',
    method: 'patch',
  },
};

export { API_ROUTES };
