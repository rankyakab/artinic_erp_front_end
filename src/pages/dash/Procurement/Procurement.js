import { Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title } from '../../../styles/main';
import { Dashlets } from './common/Dashlets';
import TotalReq from '../../../assets/images/total_request.svg';
import TotalCost from '../../../assets/images/total_cost.svg';
import PendingReq from '../../../assets/images/pending_request.svg';
import ApprovedReq from '../../../assets/images/approved_request.svg';
import { ProcurementRequests } from './common/procurementTables';
import { getAllProcurements } from '../../../redux/actions/ProcurementsAction';

const Procurement = () => {
  const navigate = useNavigate();

  const { procurements } = useSelector((state) => state.procurements);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProcurements());
  });

  return (
    <>
      <Helmet>Procurement | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Procurement'} text={'Request for, and view all requested procurements.'} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets number={'350'} text={'Total requests made'} per={'50 more than last year'} img={TotalReq} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'8,000,000'} text={'Total cost incurred'} img={PendingReq} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'20'} text={'Pending requests'} img={TotalCost} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'330'} text={'Approved requests'} per={'50 more than last year'} img={ApprovedReq} />
          </Grid>
        </Grid>

        <FormCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Procurement request</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/procurement_request');
              }}
            >
              Make Procurement Request
            </Button>
          </Box>
        </FormCard>
        <FormCard>
          {/* <ProcurementRequests /> */}
          <ProcurementRequests procurements={procurements} />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default Procurement;
