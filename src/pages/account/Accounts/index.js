import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllStaffs, getStaffById } from '../../../redux/actions/StaffAction';
import { Dashlets } from '../../../components/dashlets';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper } from '../../../styles/main';
// import { ProjectProgress, StaffCard } from '../../dash/Dashboard/common/DashboardStat';
// import { BudgetPerformance, DeliveryTimeline } from '../../dash/Dashboard/common/DashboardTables';
import Staff from '../../../assets/images/dash_staff.svg';
import Applications from '../../../assets/images/applications.svg';
import Projects from '../../../assets/images/projects.svg';
import Departments from '../../../assets/images/departments.svg';
import { capitalize } from '../../../utils/formatNumber';
import {
  ClientBalances,
  ExpensesHistory,
  Approvals,
  ClientInvoices,
  ClientReceipts,
} from './common/ExpensesHistoryTable';
import ExpensesStats from './common/ExpensesStats';
import { getAllBalances } from '../../../redux/actions/ClientBalanceAction';
import { getAllInvoices } from '../../../redux/actions/InvoiceAction';
import { getAllReceipts } from '../../../redux/actions/ReceiptsAction';
import { getAllVoucher } from '../../../redux/actions/VoucherAction';

function Accounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.auth);
  // const { staffs } = useSelector((state) => state?.staff);

  const { allClientBalance } = useSelector((state) => state?.clientBalance);

  const { invoices } = useSelector((state) => state.invoice);

  const { receipts } = useSelector((state) => state.receipt);

  const { vouchers } = useSelector((state) => state?.voucher);

  const [loggedInUser, setLoggedInUser] = useState({});
/*
  const getStaffName = (id) => {
    dispatch(getStaffById(id));
  };
  */

  const getUser = async (id) => {
    const res = await getStaffById(id);
    console.log(res);
    setLoggedInUser(res);
  };

  console.log(vouchers);
  // const { themeStretch } = useSettingsContext();

  useEffect(() => {
    dispatch(getAllStaffs());
    getUser(user?.user?.staffId);
  });

  useEffect(() => {
    dispatch(getAllBalances());
    dispatch(getAllInvoices());
    dispatch(getAllReceipts());
    dispatch(getAllVoucher());
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
            <ExpensesHistory vouchers={vouchers} navigate={navigate} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpensesStats />
          </Grid>

          <Grid item xs={12} md={6}>
            <ClientBalances clientBalance={allClientBalance?.clientbalances} navigate={navigate} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Approvals />
          </Grid>
          <Grid item xs={12} md={6}>
            <ClientInvoices invoices={invoices} navigate={navigate} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ClientReceipts receipts={receipts?.receipts} navigate={navigate} />
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

export default Accounts;
