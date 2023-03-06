const API_ROUTES = {
  getAllApproval: {
    route: '/approvals',
    method: 'get',
  },
  getApprovalById: {
    route: '/approval/',
    method: 'get',
  },

  covertApprovalToUser: {
    route: '/approval/user/',
    method: 'get',
  },

  createApproval: {
    route: '/approval/create',
    method: 'post',
  },

  editApproval: {
    route: '/approval/patch',
    method: 'post',
  },

  comfirmApproval: {
    route: '/approval/comfirm',
    method: 'post',
  },
};

export { API_ROUTES };
