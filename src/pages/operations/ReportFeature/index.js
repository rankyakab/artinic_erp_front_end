import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeaderCard2 from '../../../components/header-card2/index';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper } from '../../../styles/main';
import { AllReports } from './SubFolder/ReportsTable';

const ReportFeature = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Report | Relia Energy</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Reports'} text={'View and create project reports'} />
        <HeaderCard2
          filterLabel="Filter report"
          buttonLabel="Search"
          filterText="Select option"
          searchLabel="Search receipts"
          totalNumberLabel="Total project reports"
          totalNumber="300"
          onClick={() => {
            navigate('/dashboard/create_reports');
          }}
        />

        <FormCard>
          <AllReports />
        </FormCard>
      </Wrapper>
    </>
  );
};

export default ReportFeature;
