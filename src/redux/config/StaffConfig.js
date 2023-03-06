const API_ROUTES = {
  getAllStaffs: {
    route: '/staff',
    method: 'get',
  },
  getStaffById: {
    route: '/staff/',
    method: 'get',
  },

  covertStaffToUser: {
    route: '/staff/user/',
    method: 'get',
  },

  createStaff: {
    route: '/staff/create',
    method: 'post',
  },

  editStaff: {
    route: '/staff/',
    method: 'patch',
  },
};

export { API_ROUTES };
