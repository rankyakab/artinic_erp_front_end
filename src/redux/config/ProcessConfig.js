const API_ROUTES = {
  getAllProcess: {
    route: '/process',
    method: 'get',
  },

  createProcess: {
    route: '/process/create',
    method: 'post',
  },

  editProcess: {
    route: '/process/',
    method: 'patch',
  },

  deleteProcess: {
    route: '/process/',
    method: 'delete',
  },

  getProcessById: {
    route: '/process/by/',
    method: 'get',
  },
};

export { API_ROUTES };
