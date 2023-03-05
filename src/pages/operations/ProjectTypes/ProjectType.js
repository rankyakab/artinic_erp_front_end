import React, { useEffect } from 'react';
// import axios from 'axios';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../styles/main';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { TypeTable } from './common/TypeTable';
import CreateType from './common/CreateType';
import { getAllProtype } from '../../../redux/actions/ProtypeAction';

const ProjectType = () => {
 // const navigate = useNavigate();

  const { protype } = useSelector((state) => state.protype);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProtype());
  });

  return (
    <>
      <Helmet>Project Type | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Project Type'} text={'Request for, and view all requested project types.'} />
        <Box>
          <CreateType />
        </Box>

        <Box sx={{ mt: 5 }}>
          <TypeTable protype={protype} />
        </Box>
      </Wrapper>
    </>
  );
};

export default ProjectType;
