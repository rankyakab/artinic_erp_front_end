import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// auth
// import AuthGuard from '../auth/AuthGuard';
// import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  Page404,
  // Dashboard,
  Staff,
  Maintenance,
  OfficeBudget,
  Procurement,
//  Roles,
  Notifications,
  StockInventory,
  CapacityBuilding,
  Logistics,
  Memo,
  PaymentVoucher,
  Circulars,
  LoginPage,
  Payroll,
  // Operations User
  Accounts,
  Operations,
  ReportFeature,
  Receipt,
  Invoice,
  ProjectManagement,
  ProjectTypes,
} from './elements';
import NewStaff from '../pages/dash/Staff/NewStaff';
import CreateMemo from '../pages/dash/memo/CreateMemo';
import CreateCircular from '../pages/dash/Circulars/CreateCircular';
import GeneratePayroll from '../pages/dash/Payroll/GeneratePayroll';
import ScheduleMaintenance from '../pages/dash/Maintenance/ScheduleMaintenance';
import ScheduledMaintenance from '../pages/dash/Maintenance/ScheduledMaintenance';
import LogisticsRequest from '../pages/dash/Logistics/LogisticsRequest';
import ProcurementRequest from '../pages/dash/Procurement/ProcurementRequest';
import TrainingRequest from '../pages/dash/CapacityBuilding/TrainingRequest';
import BudgetRequest from '../pages/dash/OfficeBudget/BudgetRequest';
import OpenedNotification from '../pages/dash/Notification/OpenedNotification';
import UpdateStock from '../pages/dash/StockInventory/common/UpdateStock';
import UpdateInventory from '../pages/dash/StockInventory/common/UpdateInventory';
import CreateVoucher from '../pages/dash/PaymentVoucher/common/CreateVoucher';
import AddInvoice from '../pages/operations/Invoice/AddInvoice';
import InvoiceDetails from '../pages/operations/Invoice/InvoiceDetails';
import CreateReports from '../pages/operations/ReportFeature/SubFolder/CreateReports';
import UpdateVoucher from '../pages/dash/PaymentVoucher/common/UpdateVoucher';
import Expenses from '../pages/account/Expenses';
import ClientBalance from '../pages/account/client/ClientBalance';
import ClientBalanceDetails from '../pages/account/client/ClientBalanceDetails';
import Approvals from '../pages/account/Accounts/approval/Approvals';
import ApprovalDetails from '../pages/account/Accounts/approval/ApprovalDetails';
import GenerateBasic from '../pages/dash/Payroll/GenerateBasic';
import GenerateAllowance from '../pages/dash/Payroll/GenerateAllowance';
import GenerateBonuses from '../pages/dash/Payroll/GenerateBonuses';
import GenerateAllowedDeduction from '../pages/dash/Payroll/GenerateAllowedDeduction';
import GenerateStaffDeduction from '../pages/dash/Payroll/GenerateStaffDeduction';
import Role from '../pages/dash/Roles/Roles';
import Process from '../pages/dash/Processes/Process';
import Action from '../pages/dash/Action/Action';
import Privileges from '../pages/dash/Privilege/Privileges';
// import Accounts from '../pages/account/Accounts';
import MemoDetails from '../pages/dash/memo/MemoDetails';
import UpdateMemo from '../pages/dash/memo/UpdateMemo';
import CreateProjects from '../pages/operations/ProjectManagement/common/CreateProject';
// import ProtectedRoutes from '../pages/auth/ProtectedRoutes';
import GenerateEmployerDeduction from '../pages/dash/Payroll/GenerateEmployerDeduction';
import Clients from '../pages/operations/Clients/Clients';
import EditStaff from '../pages/dash/Staff/EditStaff';

// ----------------------------------------------------------------------

export default function Router() {
  const userRole = JSON.parse(localStorage.getItem('user'))?.user?.role;

  // const roles = JSON.parse(localStorage.getItem('roles'));

  const { roles } = useSelector((state) => state.role);

   console.log(roles);

  const filterRoles = roles.filter((role) => userRole === role?._id);

  console.log(filterRoles);
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
          
            // <GuestGuard>
          <LoginPage />
            // </GuestGuard>
            // <ProtectedRoutes>
            //   <LoginPage />
            // </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        // <AuthGuard>
        <DashboardLayout />
        // </AuthGuard>

        // <ProtectedRoutes>
        // <DashboardLayout />
        // </ProtectedRoutes>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'one',
          element:  <Operations />
          /*
            filterRoles[0]?.role?.toLowerCase() === 'human resource ' ? (
              <Dashboard />
            ) : filterRoles[0]?.role?.toLowerCase() === 'management' ? (
              <ProjectManagement />
            ) : filterRoles[0]?.role?.toLowerCase() === 'account' ? (
              <Accounts />
            ) : (
              <Operations />
            ),
            */
        },
        // {
        //   element: <Staff />,
        //   children: [
        //     {
        //       path: '/staff',
        //       element: <Staff />,
        //     },

        //     {
        //       path: 'new-staff',
        //       element: <NewStaff />,
        //     },
        //   ],
        // },
        { path: 'staff', element: <Staff /> },
        { path: 'new-staff', element: <NewStaff /> },
        { path: 'edit-staff/:id', element: <EditStaff /> },
        { path: 'payroll', element: <Payroll /> },
        { path: 'generate-payslip', element: <GeneratePayroll /> },
        { path: 'generate-basic', element: <GenerateBasic /> },
        { path: 'generate-allowance', element: <GenerateAllowance /> },
        { path: 'generate-bonus', element: <GenerateBonuses /> },
        { path: 'generate-allowed-deduction', element: <GenerateAllowedDeduction /> },
        { path: 'generate-staff-deduction', element: <GenerateStaffDeduction /> },
        { path: 'generate-employer-deduction', element: <GenerateEmployerDeduction /> },
        { path: 'memo', element: <Memo /> },
        { path: 'create-memo', element: <CreateMemo /> },
        { path: 'memo-details/:id', element: <MemoDetails /> },
        { path: 'update-memo/:id', element: <UpdateMemo /> },
        { path: 'payment_voucher', element: <PaymentVoucher /> },
        { path: 'create_voucher', element: <CreateVoucher /> },
        { path: 'update-voucher/:id', element: <UpdateVoucher /> },
        { path: 'circulars', element: <Circulars /> },
        { path: 'create-circulars', element: <CreateCircular /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'schedule-maintenance', element: <ScheduleMaintenance /> },
        { path: 'scheduled-maintenance/:id', element: <ScheduledMaintenance /> },
        { path: 'logistics', element: <Logistics /> },
        { path: 'logistics-request', element: <LogisticsRequest /> },
        { path: 'office_budget', element: <OfficeBudget /> },
        { path: 'budget_request', element: <BudgetRequest /> },
        { path: 'stocks_and_inventory', element: <StockInventory /> },
        { path: 'update_stocks', element: <UpdateStock /> },
        { path: 'update_inventory', element: <UpdateInventory /> },
        { path: 'notifications', element: <Notifications /> },
        { path: 'opened_notification', element: <OpenedNotification /> },
        { path: 'capacity_building', element: <CapacityBuilding /> },
        { path: 'training_request', element: <TrainingRequest /> },
        { path: 'procurement', element: <Procurement /> },
        { path: 'procurement_request', element: <ProcurementRequest /> },
        { path: 'roles', element: <Role /> },
        { path: 'process', element: <Process /> },
        { path: 'action', element: <Action /> },
        { path: 'privileges', element: <Privileges /> },

        // Operations User
        { path: 'operations_dashboard', element: <Operations /> },
        { path: 'create_projects', element: <CreateProjects /> },
        { path: 'projects', element: <ProjectManagement /> },
        { path: 'invoice', element: <Invoice /> },
        { path: 'clients', element: <Clients /> },
        { path: 'project_types', element: <ProjectTypes /> },
        { path: '/dashboard/generate-invoice', element: <AddInvoice /> },
        { path: '/dashboard/invoice-details/:id', element: <InvoiceDetails /> },
        { path: 'receipt', element: <Receipt /> },
        { path: 'report', element: <ReportFeature /> },
        { path: 'create-reports', element: <CreateReports /> },

        // Accounts
        { path: 'accounts_dashboard', element: <Accounts /> },

        { path: 'expenses', element: <Expenses /> },
        { path: 'client_balance', element: <ClientBalance /> },
        { path: '/dashboard/client-balance-details/:id', element: <ClientBalanceDetails /> },
        { path: 'approvals', element: <Approvals /> },
        { path: '/dashboard/approvals-details/:id', element: <ApprovalDetails /> },
        // { path: 'accounts_dashboard', element: <Accounts /> },
        // { path: 'expenses', element: <Expenses /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
