import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { options } from 'numeral';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FormCard, Title } from '../../../../styles/main';

const ExpensesStats = ({ select = false }) => {
  const [options, setOptions] = useState({
    series: [
      {
        name: 'Loss',
        data: [300, 380, 380, 350, 350, 350, 450, 400, 300, 480, 420, 430],
      },

      {
        name: 'Profit',
        data: [0, 50, 0, 0, 100, 0, 0, 0, 100, 0, 90, 0],
      },
    ],

    options: {
      colors: ['#ED3237', '#10A142'],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'top',
        // horizontalAlign: 'right',
        // offsetX: 40,
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
    },
  });

  // const [series, setSeries] = useState([
  //   {
  //     name: 'Loss',
  //     data: ['300K', '380K', '380K', '350k', '350k', '350k', '450k', '400k', '300k', '480k', '420k', '430k'],
  //   },

  //   {
  //     name: 'Profit',
  //     data: ['0K', '50k', '0k', '0k', '100k', '0k', '0k', '0k', '100k', '0k', '90k', '0k'],
  //   },
  // ]);

  return (
    <FormCard sx={{ mt: 0 }} id="chart">
      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'} width="100%" sx={{ mb: '1rem' }}>
        <Title>Profit and Loss</Title>
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
      <ReactApexChart options={options?.options} series={options?.series} type="line" height={'auto'} />
    </FormCard>
  );
};

export default ExpensesStats;
