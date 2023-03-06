import React from 'react';
import Chart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

export const ProjectProgress = () => {
  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: ['In Progress', 'Completed', 'Undone'],
    colors: ['#F29425', '#10A142', '#A3A3A3'],
  };
  const series = [41, 30, 9];
  return (
    <>
      <FormCard sx={{ mt: 0, mb: 3 }}>
        <Title>Project Progress</Title>
        <Chart
          options={options}
          series={series}
          type="donut"
          width="400"
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </FormCard>
    </>
  );
};

export const StaffCard = () => {
  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: ['Approved', 'Pending', 'Rejected'],
    colors: ['#10A142', '#F29425', '#E54F53'],
  };
  const series = [370, 80, 50];
  return (
    <>
      <FormCard sx={{ mt: 0, mb: 3 }}>
        <Title>Staff Applications Card</Title>
        <Chart
          options={options}
          series={series}
          type="donut"
          width="400"
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </FormCard>
    </>
  );
};
