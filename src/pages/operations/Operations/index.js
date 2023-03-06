import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Title, Wrapper } from '../../../styles/main';
import { Dashlets } from '../../../components/dashlets';
import ProspectiveProject from '../../../assets/images/posp_project.svg';
import TotalProject from '../../../assets/images/total_project.svg';
import OngoingProject from '../../../assets/images/ongoing_project.svg';
import CompleteProject from '../../../assets/images/completed_project.svg';
import { ClientInvoice, ClientReceipt } from './SubFolder/OperationsTable';
import OperationStat from './SubFolder/OperationStat';
import { getAllStaffs, getStaffById } from '../../../redux/actions/StaffAction';
import { capitalize } from '../../../utils/formatNumber';

const Operations = () => {
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
        {/* <DashboardHeader title={'Welcome, Mr. Otor John'} text={'Today is Saturday, 11th November 2022.'} /> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'10'}
              text={'Total number of staff'}
              // per={'12 more than last quarter'}
              img={ProspectiveProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'50'}
              text={'Total application'}
              per={'0.2% lower than last quarter'}
              img={TotalProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'20'}
              text={'Total projects'}
              //  per={'2% more than last quarter'}
              img={OngoingProject}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'30'}
              text={'Total departments'}
              //  per={'50 more than last year'}
              img={CompleteProject}
            />
          </Grid>
        </Grid>

        <FormCard>
          <Title>Projects Statisticss</Title>
          <OperationStat />
        </FormCard>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormCard>
              <ClientInvoice />
            </FormCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormCard>
              <ClientReceipt />
            </FormCard>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Operations;
