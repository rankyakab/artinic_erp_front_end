import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
// @mui
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Dashlets } from './common/Dashlets';
import './common/maintenance.css';
import { Wrapper, HeadCard } from '../../../styles/main';
import ScheduleMain from '../../../assets/images/scheduledMaintenance.svg';
import CompleteMain from '../../../assets/images/completeMaintenance.svg';
import PendingMain from '../../../assets/images/pendingMaintenance.svg';
import OverdueMain from '../../../assets/images/overdueMaintenance.svg';

// components
import { useSettingsContext } from '../../../components/settings';
import { getAllScheduledMaintenance } from '../../../redux/actions/MaintenanceAction';

// ----------------------------------------------------------------------

export default function PageSix() {
  // const { themeStretch } = useSettingsContext();

  const [date, setDate] = useState(new Date());

  console.log(date);

  const navigate = useNavigate();

  const { maintenance } = useSelector((state) => state.maintenance);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllScheduledMaintenance());
  });

  console.log(maintenance);

  const completeMaintenance = maintenance?.filter((item) => item?.status === 'Maintenance Completed'
  );
  const pendingMaintenance = maintenance?.filter((item) =>  item?.status === 'Pending maintenance'
);
  const overdueMaintenance = maintenance?.filter((item) => item?.status === 'Overdue maintenance');

  console.log(completeMaintenance);

  return (
    <>
      <Helmet>
        <title> Maintenance | Minimal UI</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Maintenance'} text={'View and create schedule for maintenance'} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={maintenance?.length}
              text={'Scheduled maintenance'}
              per={'2 more than last quarter'}
              img={ScheduleMain}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={completeMaintenance?.length}
              text={'Completed maintenance'}
              per={'2 more than last quarter'}
              img={CompleteMain}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={pendingMaintenance?.length}
              text={'Pending maintenance'}
              per={'2 more than last quarter'}
              img={PendingMain}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={overdueMaintenance?.length}
              text={'Overdue maintenance'}
              per={'2 more than last quarter'}
              img={OverdueMain}
            />
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
            spacing={3}
          >
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Schedule a Maintenance
            </Typography>

            <Button
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
              onClick={() => navigate('/dashboard/schedule-maintenance')}
            >
              Schedule Maintenance
            </Button>
          </Grid>
        </HeadCard>
        <HeadCard
          sx={{
            margin: '16px 0px 0px 0px',
          }}
        >
          <Grid container md={12}>
            <Stack sx={{ width: '100%', height: '100%' }}>
              <Grid item xs={12} sx={{ marginBottom: '32px' }}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Scheduled Maintenance
                </Typography>
              </Grid>

              <Stack
                direction={{ xs: 'column', sm: 'row', width: '100%' }}
                spacing={{ xs: 1, sm: 2, md: 8 }}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{ padding: '2rem 0rem' }}
              >
                <Grid item>
                  <Calendar prev2Label={false} next2Label={false} onChange={setDate} value={date} />
                </Grid>

                <Stack spacing={4} sx={{ width: '100%', height: '300px', overflowX: 'hidden' }}>
                  {maintenance?.map((item, key) => (
                    <Grid sx={{ height: '100%' }}>
                      <Typography>{moment(item?.createdAt).format('Do MMMM YYYY')}</Typography>
                      <Typography
                        sx={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          mb: '16px',
                        }}
                      >
                        {key + 1}. {item?.actionRequired}
                      </Typography>
                      <Button
                        sx={{
                          color: 'white',
                          background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                          py: 1,
                          px: 5,
                          width: '100px',
                        }}
                        onClick={() => {
                          navigate(`/dashboard/scheduled-maintenance/${item?._id}`);
                        }}
                      >
                        View
                      </Button>
                    </Grid>
                  ))}
                  {/* <Grid item>
                    <Typography>18th November, 2022</Typography>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        mb: '16px',
                      }}
                    >
                      2. Scheduled maintenance for service of 3 unit of AC
                    </Typography>
                    <Button
                      sx={{
                        color: 'white',
                        background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                        py: 1,
                        px: 5,
                        width: '100px',
                      }}
                    >
                      View
                    </Button>
                  </Grid> */}
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </HeadCard>
        {/* </Container> */}
      </Wrapper>
    </>
  );
}
