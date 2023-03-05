import React, { useEffect } from 'react';
import { Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from '../../../styles/main';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import CreateClient from './common/CreateClient';
import { ClientTable } from './common/ClientsTable';
import { getAllClients } from '../../../redux/actions/ClientsAction';

const Clients = () => {
  // const navigate = useNavigate();

  const { clients } = useSelector((state) => state.clients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClients());
  });

  return (
    <>
      <Helmet>Clients | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Clients'} text={'Request for, and view all requested procurements.'} />
        <Box>
          <CreateClient />
        </Box>

        <Box sx={{ mt: 5 }}>
          <ClientTable clients={clients} />
        </Box>
      </Wrapper>
    </>
  );
};

export default Clients;
