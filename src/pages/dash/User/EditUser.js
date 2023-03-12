import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Grid,Stack,Typography } from '@mui/material';
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';

import { FormCard, Wrapper } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { getAllRole } from '../../../redux/actions/RoleAction';
import AssignRoleForm from './common/AssignRoleForm';
 import { EditUserRole} from '../../../redux/actions/UserAction';

const EditUser = () => {
  // const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();


  const params = useParams();

 
 
  const { roles } = useSelector((state) => state.role);


  const { users } = useSelector((state) => state.user);

   console.log("this is for all the users in the house", users);

  const filterUser = users?.filter((user) => user?._id === params?.id);


  const [userData, setUserData] = useState({
    firstName: filterUser[0]?.email,
    id: filterUser[0]?._id,
    role: filterUser[0]?.role,
  
  });
  const [userRole, setUserRole] = useState({
    role:filterUser[0].role,
  });

  // console.log(userData);

  const handleBack = () => {
    navigate('/dashboard/user');
  };

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const dispatch = useDispatch();

  

  const handleRoleFormChange = ({ name, value }) => {
    setUserRole((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log({[name]: value,})
  };


  const handleEditRole = () => {
    dispatch(EditUserRole(userRole, filterUser[0]?._id, setErrorMessage, setSuccessMessage, setOpen, setError));
  };
  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {

 
    dispatch(getAllRole());
  }, [dispatch]);

  return (
    <>
      <SuccessCard
        open={open}
        handleClose={handleClose}
        message={successMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <ErrorCard
        open={error}
        handleClose={handleClose}
        message={errorMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <Helmet>
        <title> Edit User |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Edit User'} text={'Edit User'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              handleBack();
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        

        {filterUser[0]?._id && (
          <FormCard>
            <Grid items xs={12} md={8} sx={{ pl: 5 }}>
              <AssignRoleForm
                userRole={userRole}
                handleFormChange={handleRoleFormChange}
                roles={roles}
                filterUser={filterUser}
                handleEditRole={handleEditRole}
              />
            </Grid>
          </FormCard>
        )}
      </Wrapper>
    </>
  );
};

export default EditUser;
