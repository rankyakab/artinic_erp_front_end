import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
// import { useSettingsContext } from '../../../components/settings';
import { Wrapper, HeadCard } from '../../../styles/main';
import { LogisticsTable } from './common/LogisticTable';
import { Dashlets } from './common/Dashlets';
import TotalReq from '../../../assets/images/total_request.svg';
import TotalCost from '../../../assets/images/total_cost.svg';
import PendingReq from '../../../assets/images/pending_request.svg';
import ApprovedReq from '../../../assets/images/approved_request.svg';
import { getAllLogistics } from '../../../redux/actions/LogisticsAction';

const Logistics = () => {
  const navigate = useNavigate();
  // const { themeStretch } = useSettingsContext();

  const { logistics, loading } = useSelector((state) => state.logistics);

  const [totalCostIncurred, setTotalCostIncurred] = useState(0);

  const dispatch = useDispatch();

  const totalCost = () =>
    logistics?.reduce((prev, cur) => {
      setTotalCostIncurred(cur?.amount + prev);
      return cur?.amount + prev;
    }, 0);

  useEffect(() => {
    dispatch(getAllLogistics());
  });

  useEffect(() => {
    totalCost();
  });

  console.log(logistics);
  console.log(totalCostIncurred);

  return (
    <>
      <Helmet>
        <title> Logistics | Minimal UI</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Logistics'} text={'View and create logistics'} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={logistics?.length}
              text={'Total request made'}
              per={'50 more than last year'}
              img={TotalReq}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={totalCostIncurred} text={'Total cost incurred'} img={PendingReq} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'70'} text={'Pending request'} img={TotalCost} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'280'} text={'Approved request'} per={'50 more than last year'} img={ApprovedReq} />
          </Grid>
        </Grid>

        <HeadCard
          sx={{
            margin: '16px 0px 0px 0px',
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
            md={12}
            // spacing={3}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Logistics request
            </Typography>

            <Button
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
              onClick={() => navigate('/dashboard/logistics-request')}
            >
              Make Logistics Request
            </Button>
          </Grid>
        </HeadCard>
        {loading ? (
          <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Container>
        ) : (
          <LogisticsTable logistics={logistics} />
        )}
      </Wrapper>
    </>
  );
};

export default Logistics;
