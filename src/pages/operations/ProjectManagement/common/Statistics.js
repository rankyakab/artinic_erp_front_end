import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

export const ProjectCompletion = () => {
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
      <FormCard sx={{ mt: 0, mb: 4.4 }}>
        <Title>Project Completion</Title>
        <Chart
          options={options}
          series={series}
          type="donut"
          width="300"
          height={240}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </FormCard>
    </>
  );
};

export const ProjectStat = () => {
  const [options, setObject] = useState({
    colors: ['#FDCC1C', '#F29425', '#10A242'],
    chart: {
      type: 'bar',
      height: 350,
      //   stacked: true,
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
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });
console.log(setObject);
  const [series, setSeries] = useState([
    {
      name: 'Prospective Project',
      data: ['3', '3', '3', '7', '5', '6', '4', '4', '2', '1', '0', '5'],
    },

    {
      name: 'Ongoing Project',
      data: ['7', '5', '6', '4', '1', '2', '4', '3', '1', '3', '6', '5'],
    },
    {
      name: 'Completed Project',
      data: ['4', '4', '5', '2', '5', '3', '3', '2', '1', '7', '1', '2'],
    },
  ]);
console.log(setSeries);
  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <Title>Project Completion</Title>
      <Chart options={options} series={series} type="bar" height={170} />
    </FormCard>
  );
};
