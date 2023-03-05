import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Grid, Box,  Button } from '@mui/material';
// components
// import { useSettingsContext } from '../../../components/settings';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import TotalLoan from '../../../assets/images/total_loan.svg';
import TotalTax from '../../../assets/images/total_tax.svg';
import NetSalary from '../../../assets/images/net_salary.svg';
import GrossSalary from '../../../assets/images/gross_salary.svg';
import {
  AllowanceTable,
  AllowedDeductionTable,
  BasicTable,
  BounusesTable,
  EmployerDeductionTable,
  PaySlipTable,
  StaffDeductionTable,
} from './common/PaySlipTable';
import PayrollStat from './common/PayrollStat';
import { Wrapper, Card, HeadCard } from '../../../styles/main';
import { Dashlets } from './common/Dashlets';
// import { capitalize } from '../../../utils/formatNumber';
import { getAllPayslip } from '../../../redux/actions/PayrollAction';
import { getAllPositions } from '../../../redux/actions/PositionAction';
import { getAllAllowances } from '../../../redux/actions/AllowanceAction';
import { getAllBonuses } from '../../../redux/actions/BonusAction';
import { getAllAllowedDeduction } from '../../../redux/actions/AllowedDeductionAction';
import { getAllEmployeeDeduction } from '../../../redux/actions/EmployeeDeductionAction';
import { getAllEmployerDeduction } from '../../../redux/actions/EmployerAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';

// ----------------------------------------------------------------------

export default function Payroll() {
  const dispatch = useDispatch();

  const { payslips, positions, allowances, bonuses, allowedDeduction, staffDeduction, employerDeduction } = useSelector(
    (state) => state?.payroll
  );

  const { staffs } = useSelector((state) => state?.staff);

  console.log(payslips);
  console.log(positions);
  console.log(allowances);
  console.log(bonuses);
  console.log(allowedDeduction);
  console.log(staffDeduction);
  console.log(employerDeduction);
  const options = [
    'Basic',
    'Allowances',
    'Bonuses',
    'Allowed Deduction',
    'Staff Deduction',
    'Employer Deduction',
    'Payslip',
  ];

  const [active, setActive] = useState('basic');

  console.log(active);

  useEffect(() => {
    dispatch(getAllPayslip());
    dispatch(getAllPositions());
    dispatch(getAllAllowances());
    dispatch(getAllBonuses());
    dispatch(getAllAllowances());
    dispatch(getAllAllowedDeduction());
    dispatch(getAllEmployeeDeduction());
    dispatch(getAllEmployerDeduction());
    dispatch(getAllStaffs());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title> Payroll | Relia EnergyI</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Payroll'} text={'Generate and send payroll to account.'} />

        <Grid container columnSpacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Dashlets
                  number={'5,205,350.00'}
                  text={'Gross salary this month'}
                  per={'% more than last month'}
                  img={GrossSalary}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Dashlets
                  number={'4,550,350.00'}
                  text={'Net salary this month'}
                  per={'2.1% more than last month'}
                  img={NetSalary}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Dashlets
                  number={'550,350.00'}
                  text={'Total tax this month'}
                  per={'2.1% more than last month'}
                  img={TotalTax}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Dashlets
                  number={'150,350.00'}
                  text={'Total loan this month'}
                  per={'1.5% less than last month'}
                  img={TotalLoan}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <PayrollStat />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            mt: '3rem',
          }}
        >
          <HeadCard>
            {React.Children.toArray(
              options?.map((option) => (
                <Button
                  onClick={() => {
                    setActive(option.toLowerCase());
                  }}
                  sx={{
                    outline: 'none',
                    border: 'none',
                    color: active.toLowerCase() === option.toLowerCase() ? '#14ADD6' : '#515151',
                  }}
                >
                  {option}
                </Button>
              ))
            )}
          </HeadCard>
        </Grid>

        <Box>
          {active.toLowerCase() === 'basic' ? (
            <BasicTable positions={positions} />
          ) : active.toLowerCase() === 'allowances' ? (
            <AllowanceTable allowances={allowances} positions={positions} />
          ) : active.toLowerCase() === 'bonuses' ? (
            <BounusesTable bonuses={bonuses} staffs={staffs} />
          ) : active.toLowerCase() === 'allowed deduction' ? (
            <AllowedDeductionTable allowedDeduction={allowedDeduction} />
          ) : active.toLowerCase() === 'staff deduction' ? (
            <StaffDeductionTable staffDeduction={staffDeduction} />
          ) : active.toLowerCase() === 'employer deduction' ? (
            <EmployerDeductionTable employerDeduction={employerDeduction} />
          ) : (
            <PaySlipTable payslips={payslips} />
          )}
        </Box>
      </Wrapper>
    </>
  );
}
