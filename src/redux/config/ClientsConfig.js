const API_ROUTES = {
  getAllClients: {
    route: '/client',
    method: 'get',
  },

  createClients: {
    route: '/client/create',
    method: 'post',
  },

  deleteClients: {
    route: '/client/',
    method: 'delete',
  },

  editClients: {
    route: '/client/',
    method: 'patch',
  },
};

export { API_ROUTES };
