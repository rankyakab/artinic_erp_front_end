const API_ROUTES = {
  getAllScheduledMaintenance: {
    route: '/maintenance',
    method: 'get',
  },

  createMaintenance: {
    route: '/maintenance/create',
    method: 'post',
  },
  getSingleMaintenance: {
    route: '/maintenance/single',
    method: 'get',
  },

  getAllAssets: {
    route: '/assets',
    method: 'get',
  },

  getAllVendors: {
    route: '/vendors',
    method: 'get',
  },

  getSingleAssets: {
    route: '/assets/single',
    method: 'get',
  },

  AddAsset: {
    route: '/assets/addasset',
    method: 'post',
  },
};

export { API_ROUTES };
