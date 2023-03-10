// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  staff: path(ROOTS_DASHBOARD, '/staff'),
  user: path(ROOTS_DASHBOARD, '/user'),
  payroll: path(ROOTS_DASHBOARD, '/payroll'),
  memo: path(ROOTS_DASHBOARD, '/memo'),
  payment_voucher: path(ROOTS_DASHBOARD, '/payment_voucher'),
  circulars: path(ROOTS_DASHBOARD, '/circulars'),
  maintenance: path(ROOTS_DASHBOARD, '/maintenance'),
  logistics: path(ROOTS_DASHBOARD, '/logistics'),
  office_budget: path(ROOTS_DASHBOARD, '/office_budget'),
  stocks_and_inventory: path(ROOTS_DASHBOARD, '/stocks_and_inventory'),
  notifications: path(ROOTS_DASHBOARD, '/notifications'),
  capacity_building: path(ROOTS_DASHBOARD, '/capacity_building'),
  procurement: path(ROOTS_DASHBOARD, '/procurement'),
  roles: path(ROOTS_DASHBOARD, '/roles'),
  process: path(ROOTS_DASHBOARD, '/process'),
  action: path(ROOTS_DASHBOARD, '/action'),
  privileges: path(ROOTS_DASHBOARD, '/privileges'),

  // Operations Manager Dashboard
  operations_dashboard: path(ROOTS_DASHBOARD, '/operations_dashboard'),
  projects: path(ROOTS_DASHBOARD, '/projects'),
  invoice: path(ROOTS_DASHBOARD, '/invoice'),
  receipt: path(ROOTS_DASHBOARD, '/receipt'),
  report: path(ROOTS_DASHBOARD, '/report'),
  clients: path(ROOTS_DASHBOARD, '/clients'),
  project_types: path(ROOTS_DASHBOARD, '/project_types'),

  // Account
  accounts_dashboard: path(ROOTS_DASHBOARD, '/accounts_dashboard'),
  expenses: path(ROOTS_DASHBOARD, '/expenses'),
  client_balance: path(ROOTS_DASHBOARD, '/client_balance'),
  approvals: path(ROOTS_DASHBOARD, '/approvals'),
};
