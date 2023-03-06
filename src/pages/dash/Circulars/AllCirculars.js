import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CallMade, CallReceived, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import moment from 'moment';
import {
  Button,
  IconButton,
  Paper,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
  Stack,
  Table,
  Box,
  Container,
  CircularProgress,
} from '@mui/material';
import { getAllCirculars } from '../../../redux/actions/CircularAction';
import { TablePagination } from '../../../utils/memoPaginationUtil';
// import '../../../components/memo/memo.css';
import HeaderCard from '../../../components/HeaderCard';
import { Title, Action } from '../../../styles/main';

function AllCirculars() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const { allCircular, loading } = useSelector((state) => state.circular);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const tableHead = ['S/N', 'Circular Title', 'Sent From', 'Sent To', 'Date', 'Circular Type', 'Action'];

  const tableData = [
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Chief Operations Officer',
      date: '16/11/2022',
      type: 'Sent',
    },
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Operations Staffs',
      date: '16/11/2022',
      type: 'Received',
    },
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Operations Staffs',
      date: '16/11/2022',
      type: 'Sent',
    },
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Operations Staffs',
      date: '16/11/2022',
      type: 'Sent',
    },
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Operations Staffs',
      date: '16/11/2022',
      type: 'Received',
    },
    {
      title: 'HR Circular for Operations Department Staff',
      from: 'Admin, HR',
      to: 'Operations Staffs',
      date: '16/11/2022',
      type: 'Received',
    },
  ];

  useEffect(() => {
    dispatch(getAllCirculars());
  }, []);

  console.log(allCircular);
  return (
    <>
      <HeaderCard
        searchLabel={'Quick search a circular'}
        totalNumber={allCircular?.length}
        totalNumberLabel={'Total circulars'}
        filterLabel={'Filter circulars'}
        filterText={'All circulars'}
        buttonLabel={'Create Circular'}
        onClick={() => {
          navigate('/dashboard/create-circulars');
        }}
        filterOptions={['Title', 'Date', 'Type']}
      />

      {/* <div className="all-memo-table">
        <div className="all-memo_table_heading">
          <h4>All Circulars</h4>
          <p>
            Showing <span>{rowsPerPage}</span> per page{' '}
          </p>
        </div>
        <Paper sx={{ width: '100%', maxHeight: '550px', overflowX: 'hidden' }} className="memo-table_paper">
          <TableContainer sx={{ maxHeight: '550px', width: '100%' }} className="memo-table_paper">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableHead.map((td, key) => (
                    <TableCell
                      key={key}
                      style={{
                        minWidth: 80,
                        fontWeight: 800,
                        fontSize: '12px',
                        lineHeight: '16px',
                        color: '#515151',
                      }}
                    >
                      {td}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key}>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                      component="th"
                      scope="row"
                    >
                      {key + 1}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                    >
                      {data.title}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                    >
                      {data.from}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                    >
                      {data.to}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                    >
                      {data.date}
                    </TableCell>

                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                    >
                      {data.type}{' '}
                      {data.type.toLocaleLowerCase() === 'sent' ? (
                        <CallMade className="memo-table-arrow" />
                      ) : (
                        <CallReceived className="memo-table-arrow" />
                      )}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 80,
                      }}
                      className="memo-table_view-more"
                    >
                      View more
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          paginationPage={paginationPage}
          total={tableData.length}
          handleChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </div> */}

      {loading ? (
        <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Container>
      ) : (
        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Title>All Circulars</Title>
              <p>
                Showing <span>{rowsPerPage}</span> per page
              </p>
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
                {allCircular?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data?.circularTitle}</TableCell>
                    <TableCell>{data?.sentFrom}</TableCell>
                    <TableCell>{data?.sentTo}</TableCell>
                    <TableCell>{moment(data?.createdAt).format('D MM YYYY')}</TableCell>
                    {/* <TableCell>{data.attachment}</TableCell> */}
                    <TableCell>
                      sent
                      <CallMade
                        style={{ fontSize: '15px', fontWeight: 'bolder', paddingLeft: '2px', paddingTop: '2px' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Action>View More</Action>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ my: 5 }}>
            <TablePagination
              paginationPage={paginationPage}
              total={allCircular?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      )}
    </>
  );
}

export default AllCirculars;
