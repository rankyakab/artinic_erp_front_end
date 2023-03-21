import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { Box, Stack, Drawer } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// config
import { NAV } from '../../../config';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { getAllRole } from '../../../redux/actions/RoleAction';


// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

  // const userRole = JSON.parse(localStorage.getItem('user'))?.user?.role;

  // const roles = JSON.parse(localStorage.getItem('roles'));\

  // const { roles } = useSelector((state) => state.role);

  // console.log(roles);

  //  const filterRoles = roles.filter((role) => userRole === role?._id);

  // console.log(filterRoles);

  const ICONS = {
    user: icon('ic_user'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_sharp_dashboard'),
    staff: icon('ic_people_fill'),
    payroll: icon('ic_payroll'),
    memo: icon('ic_memo'),
    payment_voucher: icon('ic_memo'),
    circulars: icon('ic_circulars'),
    maintenance: icon('ic_maintenance'),
    logistics: icon('ic_logistics'),
    budget: icon('ic_budget'),
    notification: icon('ic_notification'),
    build: icon('ic_build'),
    procurement: icon('ic_procurement'),
    receipt: icon('ic_receipt'),
    invoice: icon('ic_invoice'),
    management: icon('ic_management'),
    role: icon('ic_role'),
    process: icon('ic_process'),
    action: icon('ic_action'),
    privileges: icon('ic_priviledges'),
    clients: icon('ic_clients'),
    projects: icon('ic_projects'),
    reports: icon('ic_reports'),
    approvals: icon('ic_approvals'),
    balance: icon('ic_balance'),
  };

  const navConfig =[
        {
          items: [
            { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
             { title: 'User', path: PATH_DASHBOARD.user, icon: ICONS.user },
            { title: 'Staff', path: PATH_DASHBOARD.staff, icon: ICONS.staff },
            { title: 'Memo', path: PATH_DASHBOARD.memo, icon: ICONS.memo },
     //       { title: 'Payroll', path: PATH_DASHBOARD.payroll, icon: ICONS.payroll },
          { title: 'Payment Vouchers', path: PATH_DASHBOARD.payment_voucher, icon: ICONS.payroll },
      //      { title: 'Circulars', path: PATH_DASHBOARD.circulars, icon: ICONS.circulars },
      //      { title: 'Maintenance', path: PATH_DASHBOARD.maintenance, icon: ICONS.maintenance },
      //      { title: 'Logistics', path: PATH_DASHBOARD.logistics, icon: ICONS.logistics },
      //      { title: 'Office Budget', path: PATH_DASHBOARD.office_budget, icon: ICONS.budget },
       //     { title: 'Office Assets', path: PATH_DASHBOARD.stocks_and_inventory, icon: ICONS.analytics },
            // { title: 'Notifications', path: PATH_DASHBOARD.notifications, icon: ICONS.notification },
      //      { title: 'Capacity Building', path: PATH_DASHBOARD.capacity_building, icon: ICONS.build },
            { title: 'Procurements', path: PATH_DASHBOARD.procurement, icon: ICONS.procurement },
            { title: 'Roles', path: PATH_DASHBOARD.roles, icon: ICONS.role },
            { title: 'Process', path: PATH_DASHBOARD.process, icon: ICONS.process },
             { title: 'Action', path: PATH_DASHBOARD.action, icon: ICONS.action },
            { title: 'Privileges', path: PATH_DASHBOARD.privileges, icon: ICONS.privileges },

            // Operations User
         //   { title: 'Operations', path: PATH_DASHBOARD.operations_dashboard, icon: ICONS.dashboard },
          //  { title: 'Project Management', path: PATH_DASHBOARD.projects, icon: ICONS.management },
          //  { title: 'Clients', path: PATH_DASHBOARD.clients, icon: ICONS.clients },
          //  { title: 'Project Types', path: PATH_DASHBOARD.project_types, icon: ICONS.projects },
          //  { title: 'Invoice', path: PATH_DASHBOARD.invoice, icon: ICONS.invoice },
           // { title: 'Receipt', path: PATH_DASHBOARD.receipt, icon: ICONS.receipt },
          //  { title: 'Report', path: PATH_DASHBOARD.report, icon: ICONS.reports },

          //  { title: 'Account Dashboard', path: PATH_DASHBOARD.accounts_dashboard, icon: ICONS.dashboard },
          //  { title: 'Expenses', path: PATH_DASHBOARD.expenses, icon: ICONS.invoice },
          //  { title: 'Client Balance', path: PATH_DASHBOARD.client_balance, icon: ICONS.balance },
          //  { title: 'Approvals', path: PATH_DASHBOARD.approvals, icon: ICONS.approvals },

            // Accounts
          //  { title: 'Account Dashboard', path: PATH_DASHBOARD.accounts_dashboard, icon: ICONS.analytics },
          //  { title: 'Expenses', path: PATH_DASHBOARD.expenses, icon: ICONS.analytics },
          ],
        },
      ];

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          // pt: 3,
          // pb: 2,
          // px: 2.5,
          py: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          // border: '2px solid yellow',
        }}
      >
        <Logo />

        {/* <NavAccount /> */}
      </Stack>

      <NavSectionVertical data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ pb: 5 }} />

      {/* <NavDocs /> */}
    </Scrollbar>
  );

  useEffect(() => {
    dispatch(getAllRole());
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
