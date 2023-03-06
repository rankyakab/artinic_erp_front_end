import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// @mui
import { Grid } from '@mui/material';
// components
import Staff from '../../../assets/images/dash_staff.svg';
import Applications from '../../../assets/images/applications.svg';
import Projects from '../../../assets/images/projects.svg';
import Departments from '../../../assets/images/departments.svg';
import { DeliveryTimeline, BudgetPerformance } from './common/DashboardTables';
import { StaffCard, ProjectProgress } from './common/DashboardStat';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper } from '../../../styles/main';
import { Dashlets } from './common/Dashlets';
import { getAllStaffs, getStaffById } from '../../../redux/actions/StaffAction';
import { capitalize } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state?.auth);
  const { staffs } = useSelector((state) => state?.staff);

  const [loggedInUser, setLoggedInUser] = useState({});

  const getStaffName = (id) => {
    dispatch(getStaffById(id));
  };

  const getUser = async (id) => {
    const res = await getStaffById(id);
    console.log(res);
    setLoggedInUser(res);
  };

  console.log(loggedInUser);
  // const { themeStretch } = useSettingsContext();
  useEffect(() => {
    dispatch(getAllStaffs());
    getUser(user?.user?.staffId);
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title> Dashboard | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader
          title={`Welcome, ${capitalize(loggedInUser?.firstName ? loggedInUser?.firstName : '')} ${capitalize(
            loggedInUser?.lastName ? loggedInUser?.lastName : ''
          )}`}
          text={`Today is ${moment().format('dddd, LL')}`}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets number={'250'} text={'Total number of staff'} per={'12 more than last quarter'} img={Staff} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'670'}
              text={'Total application'}
              per={'0.2% lower than last quarter'}
              img={Applications}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'10'} text={'Total projects'} per={'2% more than last quarter'} img={Projects} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'10'} text={'Total departments'} per={'50 more than last year'} img={Departments} />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: '1px' }}>
          <Grid item xs={12} md={6}>
            <DeliveryTimeline />
          </Grid>

          <Grid item xs={12} md={6}>
            <BudgetPerformance />
          </Grid>

          <Grid item xs={12} md={6}>
            <ProjectProgress />
          </Grid>
          <Grid item xs={12} md={6}>
            <StaffCard />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}
