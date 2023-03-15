import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
import { getAllStaffs, getStaffById } from '../../../redux/actions/StaffAction';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
// import ProfilePic from '../../../assets/images/profile.svg';
// import { capitalize } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Profile',
    linkTo: '/',
  },
  {
    label: 'Settings',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
 // const { staffs } = useSelector((state) => state?.staff);

  const [loggedInUser, setLoggedInUser] = useState({});
 
  const { logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };
/*
  const getStaffName = (id) => {
    dispatch(getStaffById(id));
  };
*/
  const getUser = async (id) => {
    const res = await getStaffById(id);
  //  console.log(res);
    setLoggedInUser(res);
  };

 //  console.log(loggedInUser);
  // const { themeStretch } = useSettingsContext();
  useEffect(() => {
    dispatch(getAllStaffs());
    getUser(user?.user?.staffId);
  }, [dispatch]);

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={loggedInUser?.propic} alt={loggedInUser?.firstName} name={loggedInUser?.firstName} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Stack direction="row">
            <Typography variant="subtitle2" noWrap sx={{ textTransform: 'Capitalize' }}>
              {loggedInUser?.firstName}
            </Typography>
            <Typography variant="subtitle2" noWrap sx={{ textTransform: 'Capitalize', ml: '0.3rem' }}>
              {loggedInUser?.lastName}
            </Typography>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loggedInUser?.personalEmail}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loggedInUser?.staffNo}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
