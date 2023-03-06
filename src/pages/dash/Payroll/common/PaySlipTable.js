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
} from '@mui/material';
import moment from 'moment';
import { Action, Status } from '../../../../styles/main';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { GetPositionName, GetStaffName } from '../../../../utils/getValueById';

export const PaySlipTable = ({ payslips }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const navigate = useNavigate();

  const handleGeneratePaySlip = () => {
    navigate('/dashboard/generate-payslip');
  };

  const tableHead = [
    'S/N',
    ' Payment Type',
    'Designation',
    'Gross Amount',
    'Tax',
    'Loan',
    'Net Amount',
    'Status',
    'Action',
  ];

  return (
    <div>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Employee PaySlip History</Typography>
            <Button
              onClick={() => {
                handleGeneratePaySlip();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate PaySlip
            </Button>
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
              {payslips?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.payment_type}</TableCell>
                  <TableCell>{data?.designation}</TableCell>
                  <TableCell>{data?.grossSalary}</TableCell>
                  <TableCell>{data?.tax}</TableCell>
                  <TableCell>{data?.loan}</TableCell>
                  <TableCell>{data?.netAmount}</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View More</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export const StaffDetailsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = [
    'S/N',
    'Employee Name',
    'Designation',
    'Gross Amount',
    'Tax',
    'Loan',
    'Net Amount',
    'Salary Type',
    'Action',
  ];

  const tableData = [
    {
      id: '01',
      employee_name: 'Abubakar Ismail',
      designation: 'Operations',
      gross_amount: '₦‎550,000.00',
      tax: '₦‎20,000.00',
      loan: '₦‎30,000.00',
      net_amount: '₦500,000.00',
      salary_type: 'Monthly salary',
    },
    {
      id: '01',
      employee_name: 'John otor',
      designation: 'HR',
      gross_amount: '₦‎20,000.00',
      tax: '₦‎10,000.00',
      loan: '₦‎50,000.00',
      net_amount: '₦500,000.00',
      salary_type: 'Monthly salary',
    },
  ];

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <TableContainer>
          <Table>
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
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data.employee_name}</TableCell>
                  <TableCell>{data.designation}</TableCell>
                  <TableCell>{data.gross_amount}</TableCell>
                  <TableCell>{data.tax}</TableCell>
                  <TableCell>{data.loan}</TableCell>
                  <TableCell>{data.net_amount}</TableCell>
                  <TableCell>{data.salary_type}</TableCell>
                  <TableCell>View More</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
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

export const BasicTable = ({ positions }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Title', 'Level', 'Basic'];

  const navigate = useNavigate();

  const handleGenerateBasic = () => {
    navigate('/dashboard/generate-basic');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Basic Position</Typography>
            <Button
              onClick={() => {
                handleGenerateBasic();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Position
            </Button>
          </Box>
          <Table>
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
              {positions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.title}</TableCell>
                  <TableCell>{data?.level}</TableCell>
                  <TableCell>{data?.basic}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={positions?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const AllowanceTable = ({ allowances, positions }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'AllowanceName', 'AllowanceAmount', 'Position'];

  const navigate = useNavigate();

  const handleGenerateAllowance = () => {
    navigate('/dashboard/generate-allowance');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Allowance</Typography>
            <Button
              onClick={() => {
                handleGenerateAllowance();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Allowance
            </Button>
          </Box>
          <Table>
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
              {allowances?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.allowanceName}</TableCell>
                  <TableCell>{data?.allowanceAmount}</TableCell>
                  <TableCell>{GetPositionName(data?.positionTreeId, positions)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={allowances?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const BounusesTable = ({ bonuses, staffs }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Staff', 'Bonus Amount', 'Bonus Description', 'Bonus Month'];

  const navigate = useNavigate();

  const handleGenerateBonus = () => {
    navigate('/dashboard/generate-bonus');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Bonuses</Typography>
            <Button
              onClick={() => {
                handleGenerateBonus();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Bonus
            </Button>
          </Box>
          <Table>
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
              {bonuses?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{GetStaffName(data?.staffId, staffs)}</TableCell>
                  <TableCell>{data?.bonusAmount}</TableCell>
                  <TableCell>{data?.bonusDescription}</TableCell>
                  <TableCell>{moment(data?.bonusMonth).format('MM')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={bonuses.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const AllowedDeductionTable = ({ allowedDeduction }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Deduction Name', 'Deduction Rate', 'Deduction Description'];

  const navigate = useNavigate();

  const handleGenerateAllowedDeduction = () => {
    navigate('/dashboard/generate-allowed-deduction');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Allowed Deduction</Typography>
            <Button
              onClick={() => {
                handleGenerateAllowedDeduction();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Deduction
            </Button>
          </Box>
          <Table>
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
              {allowedDeduction?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.deductionName}</TableCell>
                  <TableCell>{data?.deductionRate}</TableCell>
                  <TableCell>{data?.deductionDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={allowedDeduction.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const StaffDeductionTable = ({ staffDeduction }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Staff', 'Deduction Amount', 'Deduction Description', 'Deduction Month'];

  const navigate = useNavigate();

  const handleGenerateStaffDeduction = () => {
    navigate('/dashboard/generate-staff-deduction');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Staff Deduction</Typography>
            <Button
              onClick={() => {
                handleGenerateStaffDeduction();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Deduction
            </Button>
          </Box>
          <Table>
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
              {staffDeduction?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.staff}</TableCell>
                  <TableCell>{data?.deductionAmount}</TableCell>
                  <TableCell>{data?.deductionDescription}</TableCell>
                  <TableCell>{data?.deductionMonth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={staffDeduction?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const EmployerDeductionTable = ({ employerDeduction }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };
  const tableHead = ['S/N', 'Staff', 'Deduction Amount', 'Deduction Description', 'Deduction Month'];

  const navigate = useNavigate();

  const handleGenerateEmployerDeduction = () => {
    navigate('/dashboard/generate-employer-deduction');
  };

  return (
    <>
      <Box sx={{ py: 5 }}>
        <TableContainer component={Paper} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 5, pt: 2 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Employer Deduction</Typography>
            <Button
              onClick={() => {
                handleGenerateEmployerDeduction();
              }}
              sx={{
                color: 'white',
                background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
                py: 1,
                px: 5,
              }}
            >
              Generate Deduction
            </Button>
          </Box>
          <Table>
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
              {employerDeduction?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.staff}</TableCell>
                  <TableCell>{data?.deductionAmount}</TableCell>
                  <TableCell>{data?.deductionDescription}</TableCell>
                  <TableCell>{data?.deductionMonth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={employerDeduction?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
