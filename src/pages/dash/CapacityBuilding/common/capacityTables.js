import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableRow, Paper, TableHead, TableCell, TableContainer, Stack } from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title } from '../../../../styles/main';

export const InProgress = styled('p')(() => ({
  color: '#F29425',
}));

export const Completed = styled('p')(() => ({
  color: '#10A142',
}));

export const Todo = styled('p')(() => ({
  color: '#515151',
}));

export const AllTraining = ({ training }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = [
    'S/N',
    'Training Description',
    'Start Date',
    'Training Type',
    'Duration',
    'Training Mode',
    'Status',
  ];

  const tableData = [
    {
      id: '01',
      training_description: 'Staff Health and Safety Training',
      start_date: '03/12/2022',
      training_type: 'Team',
      duration: '3 days',
      training_mode: 'Physical',
      status: <InProgress>In Progress</InProgress>,
    },

    {
      id: '02',
      training_description: 'Staff Health and Safety Training',
      start_date: '03/12/2022',
      training_type: 'Team',
      duration: '1 month',
      training_mode: 'Online',
      status: <Todo>To-do</Todo>,
    },

    {
      id: '03',
      training_description: 'Staff Health and Safety Training',
      start_date: '03/12/2022',
      training_type: 'Individual',
      duration: '2 weeks',
      training_mode: 'Online',
      status: <Completed>Completed</Completed>,
    },
    {
      id: '04',
      training_description: 'Staff Health and Safety Training',
      start_date: '03/12/2022',
      training_type: 'Team',
      duration: '1 month',
      training_mode: 'Online',
      status: <Todo>To-do</Todo>,
    },

    {
      id: '05',
      training_description: 'Staff Health and Safety Training',
      start_date: '03/12/2022',
      training_type: 'Individual',
      duration: '2 weeks',
      training_mode: 'Online',
      status: <Completed>Completed</Completed>,
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Training request</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {training?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.trainingDescription}</TableCell>
                  <TableCell>{data?.startDate}</TableCell>
                  <TableCell>{data?.trainingType}</TableCell>
                  <TableCell>{data?.duration} days</TableCell>
                  <TableCell>{data?.trainingMode}</TableCell>
                  <TableCell>{data?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 2 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={tableData.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
AllTraining.propTypes = {
  training:PropTypes.any,
  
 
  
};

export const PaymentVoucher = () => {
  const tableHead = [
    'S/N',
    'Item',
    'Quantity',
    'Date',
    'Unit Price (₦)',
    'Total Price (₦)',
    'VAT %',
    'VAT Amount (₦)',
    'Gross Amount (₦)',
  ];

  const tableData = [
    {
      id: '01',
      item: 'Office chairs',
      quantity: '25',
      date: '21/11/2022',
      unit_price: '100,000.00',
      total_price: '2,500,000.00',
      vat: '7.50%',
      vat_amount: '187,500.00',
      gross_amount: '2,687,500.00',
    },
  ];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>Payment Voucher</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  'td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.item}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.unit_price}</TableCell>
                  <TableCell>{data.total_price}</TableCell>
                  <TableCell>{data.vat}</TableCell>
                  <TableCell>{data.vat_amount}</TableCell>
                  <TableCell>{data.gross_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
