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

//
// import navConfig from './config';
// import NavDocs from './NavDocs';
// import NavAccount from './NavAccount';

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



  // const filterRoles = roles.filter((role) => userRole === role?._id);

 



   // icons for nav bar
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



  // configuration for nav bar

  const navConfig =  [
          {
            items: [

             

               { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
              { title: 'Staff', path: PATH_DASHBOARD.staff, icon: ICONS.staff },
              { title: 'Roles', path: PATH_DASHBOARD.roles, icon: ICONS.role },
              { title: 'Process', path: PATH_DASHBOARD.process, icon: ICONS.process },
              { title: 'Action', path: PATH_DASHBOARD.action, icon: ICONS.action },
              { title: 'Privileges', path: PATH_DASHBOARD.privileges, icon: ICONS.privileges },

      
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
/*
  useEffect(() => {
    dispatch(getAllRole());
  }, []);
*/

useEffect(() => {
    dispatch(getAllRole());
  });
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
