import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title } from '../../../styles/main';
import { BudgetHistory } from './common/budgetTable';
import { Dashlets } from './common/Dashlets';
import BudgetBalance from '../../../assets/images/budget_balance.svg';
import BudgetUsed from '../../../assets/images/budget_used.svg';
import AmountUsed from '../../../assets/images/amount_used.svg';
import AnnualBudget from '../../../assets/images/annual_budget.svg';
import { getAllBudgets } from '../../../redux/actions/BudgetsAction';

const OfficeBudget = () => {
  const navigate = useNavigate();

  const { budgets } = useSelector((state) => state.budgets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBudgets());
  });

  console.log(budgets, 'budgets');

  return (
    <>
      <Helmet>Office Budget | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Office Budget'} text={'View, create and send budget request.'} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Dashlets
              number={'₦‎23,000,000'}
              text={'Total annual budget'}
              per={'5% more than last year'}
              img={AnnualBudget}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'₦‎10,000,000'} text={'Amount used, YTD'} img={AmountUsed} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'₦‎13,000,000'} text={'Total budget balance'} img={BudgetBalance} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Dashlets number={'48%'} text={'Budget % used'} img={BudgetUsed} />
          </Grid>
        </Grid>
        <FormCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Create a Budget</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/budget_request');
              }}
            >
              Create Budget
            </Button>
          </Box>
        </FormCard>
        <FormCard>
          <BudgetHistory budgets={budgets} />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default OfficeBudget;
