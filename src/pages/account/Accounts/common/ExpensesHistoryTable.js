import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Typography,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Action, Failed, Pending, Status, Title } from '../../../../styles/main';

export const ClientBalances = ({ clientBalance, navigate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const tableHead = ['S/N', 'Project Name', 'Total Cost (₦‎)', 'Balance (₦‎)', 'Action'];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
            <Box sx={{ pb: 3, width: '100%' }}>
              <Title sx={{ fontWeight: 'bold', fontSize: 20 }}>Client Balances</Title>
            </Box>
            <Button
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                width: '30%',
                py: 1.5,
                px: 5,
                mt: 5,
                mb: 2,
              }}
              onClick={() => {
                navigate('/dashboard/client_balance');
              }}
            >
              View All
            </Button>
          </Stack>

          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clientBalance?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.projectName}</TableCell>
                  <TableCell>{data?.projectCost}</TableCell>
                  <TableCell>{data?.paymentsBalances}</TableCell>
                  <TableCell>
                    <Action
                      onClick={() => {
                        navigate(`/dashboard/client-balance-details/${data?._id}`);
                      }}
                    >
                      View
                    </Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const ExpensesHistory = ({ vouchers, navigate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Description', 'Amount Used (₦‎)'];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
              <Title sx={{ width: '100%', fontWeight: 'bold', fontSize: 20 }}>Expenses History</Title>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  width: '30%',
                  py: 1.5,
                  px: 5,
                  mt: 5,
                  mb: 2,
                }}
                onClick={() => {
                  navigate('/dashboard/payment_voucher');
                }}
              >
                View All
              </Button>
            </Stack>
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.subject}</TableCell>
                  <TableCell>{data?.Amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const Approvals = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Description', 'Status'];

  const tableData = [
    {
      id: '01',
      Description: 'Payment invoice for project XYZ',
      Status: 'Pending',
    },

    {
      id: '02',
      Description: 'Invoice for the purchase of stationary',
      Status: 'Approved',
    },

    {
      id: '03',
      Description: 'Payment invoice for project XYZ',
      Status: 'Pending',
    },
    {
      id: '04',
      Description: 'Invoice for the purchase of stationary',
      Status: 'Rejected',
    },
  ];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
            <Title sx={{ width: '100%', fontWeight: 'bold', fontSize: 20 }}>All Approvals</Title>
            <Button
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                width: '30%',
                py: 1.5,
                px: 5,
                mt: 5,
                mb: 2,
              }}
            >
              View All
            </Button>
          </Stack>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {React.Children.toArray(
                tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data?.Description}</TableCell>
                    <TableCell>
                      {data?.Status.toLowerCase() === 'pending' ? (
                        <Pending>{data?.Status}</Pending>
                      ) : data?.Status.toLowerCase() === 'approved' ? (
                        <Status>{data?.Status}</Status>
                      ) : data?.Status.toLowerCase() === 'rejected' ? (
                        <Failed>{data?.Status}</Failed>
                      ) : (
                        <Pending>{data?.Status}</Pending>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const ClientInvoices = ({ invoices, navigate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Invoice Title', 'Action'];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
              <Title sx={{ width: '100%', fontWeight: 'bold', fontSize: 20 }}>Client Invoices</Title>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  width: '30%',
                  py: 1.5,
                  px: 5,
                  mt: 5,
                  mb: 2,
                }}
                onClick={() => {
                  navigate('/dashboard/invoice');
                }}
              >
                View All
              </Button>
            </Stack>
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.subject}</TableCell>
                  <TableCell>
                    <Action
                      onClick={() => {
                        navigate(`/dashboard/invoice-details/${data?._id}`);
                      }}
                    >
                      View
                    </Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const ClientReceipts = ({ receipts, navigate }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Receipts Title', 'Action'];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
              <Title sx={{ width: '100%', fontWeight: 'bold', fontSize: 20 }}>Client Receipts</Title>
              <Button
                sx={{
                  color: 'white',
                  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                  width: '30%',
                  py: 1.5,
                  px: 5,
                  mt: 5,
                  mb: 2,
                }}
                onClick={() => {
                  navigate(`/dashboard/receipt`);
                }}
              >
                View All
              </Button>
            </Stack>
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.subject}</TableCell>
                  <TableCell>
                    <Action
                      onClick={() => {
                        navigate(`/dashboard/receipt-details/${data?._id}`);
                      }}
                    >
                      View
                    </Action>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const ExpensesHistoryYears = ({ data, select }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Description', 'Amount Used (₦‎)'];

  const tableData = [
    {
      id: '01',
      Description: 'Purchase of office equipment',
      Amount: '₦‎1,200,000.00',
    },

    {
      id: '02',
      Description: 'Purchase of office equipment',
      Amount: '₦‎1,200,000.00',
    },

    {
      id: '03',
      Description: 'Purchase of office equipment',
      Amount: '₦‎1,200,000.00',
    },
    {
      id: '04',
      Description: 'Purchase of office equipment',
      Amount: '₦‎1,200,000.00',
    },
  ];

  return (
    <div>
      <Box sx={{ py: 2 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ pb: 3 }}>
            <Stack direction={'row'} alignItems="center" justifyContent="center" width="100%">
              <Title sx={{ width: '100%', fontWeight: 'bold', fontSize: 20 }}>Expenses History</Title>
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
          </Box>
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead.map((td, key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 800,
                      fontSize: '14px',
                      lineHeight: '16px',
                      color: '#515151',
                      background: 'white',
                      borderoBottom: '1px solid #DDDDDD',
                    }}
                  >
                    {td}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.subject}</TableCell>
                  <TableCell>{data?.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
