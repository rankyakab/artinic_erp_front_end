import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));

// HR User
export const Dashboard = Loadable(lazy(() => import('../pages/dash/Dashboard/Dashboard')));
export const Staff = Loadable(lazy(() => import('../pages/dash/Staff/Staff')));
export const Payroll = Loadable(lazy(() => import('../pages/dash/Payroll/Payroll')));
export const Memo = Loadable(lazy(() => import('../pages/dash/memo/Memo')));
export const PaymentVoucher = Loadable(lazy(() => import('../pages/dash/PaymentVoucher/PaymentVoucher')));
export const Circulars = Loadable(lazy(() => import('../pages/dash/Circulars/Circulars')));
export const Maintenance = Loadable(lazy(() => import('../pages/dash/Maintenance/Maintenance')));
export const Logistics = Loadable(lazy(() => import('../pages/dash/Logistics/Logistics')));
export const OfficeBudget = Loadable(lazy(() => import('../pages/dash/OfficeBudget/OfficeBudget')));
export const StockInventory = Loadable(lazy(() => import('../pages/dash/StockInventory')));
export const Notifications = Loadable(lazy(() => import('../pages/dash/Notification/Notifications')));
export const CapacityBuilding = Loadable(lazy(() => import('../pages/dash/CapacityBuilding/CapacityBuilding')));
export const Procurement = Loadable(lazy(() => import('../pages/dash/Procurement/Procurement')));
export const Roles = Loadable(lazy(() => import('../pages/dash/Roles/Roles')));
export const Process = Loadable(lazy(() => import('../pages/dash/Processes/Process')));
export const Action = Loadable(lazy(() => import('../pages/dash/Action/Action')));
export const Privileges = Loadable(lazy(() => import('../pages/dash/Privilege/Privileges')));

// Operations User
export const Operations = Loadable(lazy(() => import('../pages/operations/Operations/index')));
export const ProjectManagement = Loadable(lazy(() => import('../pages/operations/ProjectManagement/Projects')));
export const Invoice = Loadable(lazy(() => import('../pages/operations/Invoice/index')));
export const Receipt = Loadable(lazy(() => import('../pages/operations/Receipt/index')));
export const ReportFeature = Loadable(lazy(() => import('../pages/operations/ReportFeature/index')));
export const Clients = Loadable(lazy(() => import('../pages/operations/Clients/Clients')));
export const ProjectTypes = Loadable(lazy(() => import('../pages/operations/ProjectTypes/ProjectType')));

// Account
export const Accounts = Loadable(lazy(() => import('../pages/account/Accounts/index')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
