// @mui
// import { styled, alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// auth
// import { useAuthContext } from '../../../auth/useAuthContext';
// components
// import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(2, 2.5),
  // borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  // const { user } = useAuthContext();

  return (
    <StyledRoot>
      {/* <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} /> */}

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px', color: 'black' }}>
          {/* Welcome, {user?.displayName} */}
          Welcome, {'John Otor'}
        </Typography>

        <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
          {/* {user?.role} */}
          HR
        </Typography>
      </Box>
    </StyledRoot>
  );
}
