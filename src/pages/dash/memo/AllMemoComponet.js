import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
// import { CallMade, CallReceived } from '@mui/icons-material';
import {
  TableBody,
  Box,
  Stack,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Table,
  CircularProgress,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { TablePagination } from '../../../utils/memoPaginationUtil';
import { Title, Action } from '../../../styles/main';
// import HeaderCard from '../../../components/HeaderCard';
import HeaderCard from '../../../components/HeaderCard';
import { getAllMemo } from '../../../redux/actions/MemoAction';
import { capitalize } from '../../../utils/formatNumber';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
// import { API_ROUTES } from '../../../redux/config/StaffConfig';
// import { BASE_URL } from '../../../helpers';

function AllMemoComponet() {
  const { allMemo, loading } = useSelector((state) => state.memo);
  const { user } = useSelector((state) => state.auth);

  const [loggedInUserMemo, setLoggedInUserMemo] = useState([]);

  const memoFilter = () => {
    const result = allMemo.filter(
      (memo) => 
        memo?.copies?.some( copy => copy===user?.user?.staffId) || memo?.recipientId === user?.user?.staffId ||  memo?.recipientId===user?.user?._id || memo?.ownerId=== user?.user?.staffId);
    setLoggedInUserMemo(result);
   // console.log("all filtered memo",result);
  };



  // const [loggedInUser, setLoggedInUser] = useState({});
  // const [viewAccess, setViewAccess] = useState(false);

  const { staffs } = useSelector((state) => state.staff);

 // console.log(allMemo);



  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    return (
      <p>
        {capitalize(filterStaff[0]?.firstName ? filterStaff[0]?.firstName : '-')}{' '}
        {capitalize(filterStaff[0]?.lastName ? filterStaff[0]?.lastName : '-')}
      </p>
    );
  };

  const [keyword, setKeyword] = useState('');

  const [memoSearch, setMemoSearch] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setMemoSearch(
      loggedInUserMemo.filter(
        (data) =>
          data?.memoTitle?.toLowerCase() === keyword?.toLowerCase() ||
          data?.memoType?.toLowerCase() === keyword?.toLowerCase() ||
          moment(data?.createdAt).format('D-MM-YYYY') === keyword
      )
    );
  };

  const tableHead = ['S/N', 'Memo Title', 'Sent From', 'Sent To', 'Date', 'Attachment?', 'Action'];
  // const tableData = [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  // console.log(allMemo);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMemo());
    dispatch(getAllStaffs());
  }, []);

  useEffect(() => {
    memoFilter();
    // memoFilterRecp();
  }, [allMemo]);
  return (
    <>
      <HeaderCard
        searchLabel={'Quick search a memo'}
        totalNumber={loggedInUserMemo?.length}
        totalNumberLabel={'Total memo'}
        filterLabel={'Filter memo'}
        filterText={'All Memo'}
        buttonLabel={'Create Memo'}
        onClick={() => {
          navigate('/dashboard/create-memo');
        }}
        handleSearch={handleSearch}
        keyword={keyword}
        setKeyword={setKeyword}
        filterOptions={['Date', 'Title', 'Attachment']}
      />

      {loading ? (
        <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Container>
      ) : (
        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Title>All Memos</Title>
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
                {(memoSearch.length === 0 ? loggedInUserMemo : memoSearch)
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, key) => (
                    <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{data?.memoTitle}</TableCell>
                      <TableCell>{getName(data?.ownerId)}</TableCell>
                      <TableCell>{getName(data?.recipientId)}</TableCell>
                      <TableCell>{moment(data?.createdAt).format('D-MM-YYYY')}</TableCell>
                      <TableCell>{data?.attachment === '' || data?.attachment === 'false' ? 'No' : 'Yes'}</TableCell>
                      {/* <TableCell>
                        {data?.memoType}
                        {data?.memoType?.toLocaleLowerCase() === 'sent' ? (
                          <CallMade
                            style={{ fontSize: '15px', fontWeight: 'bolder', paddingLeft: '2px', paddingTop: '2px' }}
                          />
                        ) : (
                          <CallReceived
                            style={{ fontSize: '15px', fontWeight: 'bolder', paddingLeft: '2px', paddingTop: '2px' }}
                          />
                        )}
                      </TableCell> */}
                      <TableCell>
                        {data.recipientId===user.staffId ?(<Action
                          onClick={() => {
                            navigate(`/dashboard/memo-details/${data?._id}`);
                          }}
                        >
                          View More
                        </Action>):(
                           <Action
                          onClick={() => {
                            navigate(`/dashboard/update-memo/${data?._id}`);
                          }}
                        >
                          Update Memo
                        </Action>
                        )}
                        
                       
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ my: 5 }}>
            <TablePagination
              paginationPage={paginationPage}
              total={memoSearch?.length === 0 ? loggedInUserMemo?.length : memoSearch?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      )}
    </>
  );
}

export default AllMemoComponet;
