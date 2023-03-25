import PropTypes from 'prop-types';
import { useEffect ,useState} from 'react';
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
        const pageProcess = {
        user:"641a09d65ab751646ea18576",
        staff:"6419ec4e5ab751646ea18437",
        memo:"6419cb3d5ab751646ea183b4",
        privileges:"641b18a9f4390d23c1841260",
        action:"641b189af4390d23c184125a",
        process:"641b187cf4390d23c1841242",
         roles:"641b1866f4390d23c184123c",
         paymentVouchers:"641b1851f4390d23c1841236"



}
const pageAction = {
        delete:"6419ca9a5ab751646ea1838e",
        edit:"6419ca8d5ab751646ea18388",
        recommendForApproval:"6419caae5ab751646ea18394",
        approve:"6419cac95ab751646ea183a0",
        create:"6419ca705ab751646ea1837c",
        convertToUser:"6419cabd5ab751646ea1839a",
        read:"6419ca805ab751646ea18382",
        
}

  const [navConfig, setNavConfig] =useState([
        {
          items: [
            { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard , process:"" },
             { title: 'User', path: PATH_DASHBOARD.user, icon: ICONS.user, process:pageProcess.user},
            { title: 'Staff', path: PATH_DASHBOARD.staff, icon: ICONS.staff, process:pageProcess.staff },
            { title: 'Memo', path: PATH_DASHBOARD.memo, icon: ICONS.memo , process:pageProcess.memo},
     //       { title: 'Payroll', path: PATH_DASHBOARD.payroll, icon: ICONS.payroll },
          { title: 'Payment Vouchers', path: PATH_DASHBOARD.payment_voucher, icon: ICONS.payroll, process:pageProcess.paymentVouchers },
       { title: 'Roles', path: PATH_DASHBOARD.roles, icon: ICONS.role ,process:pageProcess.roles},
            { title: 'Process', path: PATH_DASHBOARD.process, icon: ICONS.process , process:pageProcess.process},
             { title: 'Action', path: PATH_DASHBOARD.action, icon: ICONS.action ,process:pageProcess.action },
            { title: 'Privileges', path: PATH_DASHBOARD.privileges, icon: ICONS.privileges ,process:pageProcess.privileges},
 ],
        },
      ]);

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
useEffect(() => {
    setNavConfig([
        {
          items: [
            { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard , process:"" },
             { title: 'User', path: PATH_DASHBOARD.user, icon: ICONS.user, process:pageProcess.user},
          
 ],
        },
      ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
