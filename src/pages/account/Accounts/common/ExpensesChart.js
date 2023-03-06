import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

const ExpensesChart = ({ select = false }) => {
  const [options, setObject] = useState({
    colors: ['#FFBC1F'],
    chart: {
      type: 'area',
      height: 350,
      //   stacked: true,
      //   toolbar: {
      //     show: true,
      //   },
      zoom: {
        enabled: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },

    legend: {
      show: false,
      //   position: 'top',
      //   offsetY: 40,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Loss',
      data: [300, 380, 380, 350, 350, 350, 450, 400, 300, 480, 420, 430],
    },
  ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'} width="100%" sx={{ mb: '1rem' }}>
        <Title>Expenses Chart</Title>
        {select && (
          <TextField
            InputLabelProps={{ shrink: true }}
            sx={{ width: '20%' }}
            variant="outlined"
            name="year"
            //   value={searchPayload.programme_id}
            //   onChange={(e) => handleChange(e.target)}
            select
            SelectProps={{ native: true }}
            InputProps={{ readOnly: true }}
          >
            <option value="">2022</option>
          </TextField>
        )}
      </Stack>
      <ReactApexChart options={options} series={series} type="area" height={'auto'} />
    </FormCard>
  );
};

export default ExpensesChart;
