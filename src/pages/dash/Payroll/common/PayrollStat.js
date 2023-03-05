import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

const PayrollStat = () => {
  const [options] = useState({
    colors: ['#248CD8', '#A601FF', '#F29425'],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });

  const [series] = useState([
    {
      name: 'Net Salary',
      data: ['300K', '380K', '380K', '350k', '350k', '350k', '450k', '400k', '300k', '480k', '420k', '430k'],
    },

    {
      name: 'Loan',
      data: ['0K', '50k', '0k', '0k', '100k', '0k', '0k', '0k', '100k', '0k', '90k', '0k'],
    },
    {
      name: 'Tax',
      data: ['100K', '200k', '150k', '200k', '50k', '300k', '350k', '220k', '100k', '80k', '150k', '200k'],
    },
  ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <Title>Annual payroll summary</Title>
      <ReactApexChart options={options} series={series} type="bar" height={240} />
    </FormCard>
  );
};

export default PayrollStat;
