import React, {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { List, Stack } from '@mui/material';
// import { useSelector } from 'react-redux';
// locales
import { useLocales } from '../../../locales';
//
import { StyledSubheader } from './styles';
import NavList from './NavList';
import { getRoleById } from '../../../redux/actions/RoleAction';

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  const { translate } = useLocales();
    const dispatch = useDispatch();
   const user = JSON.parse(localStorage.getItem('user'));
 const { role } = useSelector((state) => state.role);
    //  const user = localStorage.getItem('user');
         
 const [userRole, setUserRole] = useState({})

useEffect(() => {
    dispatch(getRoleById(user?.user.role));
    
    
    const userRolde = JSON.parse(localStorage.getItem('role'));
    console.log("this is your ysoueer local storagerole",userRolde);

    console.log("this is your ysoueer role from dispatch",role);
     console.log("this is your ysoueer user from localstorage",user);
  }, []);


      // user.role

 //  console.log(user);
 
 // const { processes } = useSelector((state) => state?.process);

  // console.log(processes);

  // const { roles } = useSelector((state) => state?.role);

  // console.log(roles);

 // const userRole = roles.filter((role) => role?._id === user?.user?.role);

  // console.log(userRole);

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

       // console.log(group.subheader);

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && <StyledSubheader disableSticky>{translate(group.subheader)}</StyledSubheader>}

            {group.items.map(
              (list) => list.process && (<NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} />)
            )}
          </List>
        );
      })}
    </Stack>
  );
}
