   import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
//
// import { checkPrivilege } from '../../../utils/checkPrivilege';
// import * as staffPrivilege from '../../../utils/privilege/staff';



function CheckPrivilege({children ,process , action}) {



const { user } = useSelector((state) => state.auth);
const [isAllowed, setIsAllowed]= useState(false);

useEffect(()=>{
    const {roles} = user;
    const userRoleId = user.user.role
    const userRole = roles.find(role=> role._id=== userRoleId)
    const {privilege}=userRole;
         const allowed =  privilege.find(prev=> prev.processId===process && prev.action.find(act=> act===action))
 if(allowed){
    
    setIsAllowed(true);

 }else{

    setIsAllowed(false);
 }
    
},[])




          // this function accepts proces(like page name) id and the id of the action on that page

 // compares it with the role and priviledges of the logged in user

// return userRole?.privilege.find(prev=>prev.processId===processId)?.action?.find(act=>act===actionid)
if (isAllowed){
    return (

    <div>{children}</div>
  )
 }
  return (
    "--"
  )
}

export default CheckPrivilege














