import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
// import IconButton as from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Action } from '../../../../styles/main';
import { convertStaffToUser, getAllStaffs } from '../../../../redux/actions/StaffAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';
import { checkPrivilege } from '../../../../utils/checkPrivilege';


export const StaffTable = ({ staffs, paginationPage, rowsPerPage, handleChangePage, page, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');

  const [editUser, setEditUser] = useState({});

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
   const deleteUserOnClick = (memoId)=>{
  // console.log("these are captured with data",selected)
   // const allData = allMemo.filter(id=> id!==memoId);
 //   dispatch(deleteMemo(memoId,getAllMemo, setOpen, setError, setErrorMessage, setSuccessMessage));
    
    getAllStaffs()
 }

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const tableHead = ['S/N', 'First Name', 'Last Name', 'Gender', 'Staff ID', 'Phone Number', 'Designation','Delete', 'Action'];

  return (
    <>
      <SuccessCard
        open={open}
        handleClose={handleClose}
        message={successMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <ErrorCard
        open={error}
        handleClose={handleClose}
        message={errorMessage}
        btnText={'Continue'}
        handleClick={handleClick}
      />
      <Box sx={{ my: 3 }}>
        <TableContainer component={Paper} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All Staff</Typography>
            <p>
              Showing <span>{rowsPerPage}</span> per page
            </p>
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
              {(search?.length === 0 ? staffs : search)
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{capitalize(data?.firstName)}</TableCell>
                    <TableCell>{capitalize(data?.lastName)}</TableCell>
                    <TableCell>{capitalize(data?.gender)}</TableCell>
                    <TableCell>{data?.staffNo}</TableCell>
                    <TableCell>{data?.phoneNumber}</TableCell>

                    <TableCell>{capitalize(data?.designation)}</TableCell>
                    <TableCell>  <IconButton color="error" aria-label="delete" onClick={()=>deleteUserOnClick(data?._id)}>
                            <DeleteIcon />
                          </IconButton></TableCell>
                   
                    <TableCell>
                      <Action
                        onClick={() => {
                          setEditUser(data);
                          navigate(`/dashboard/edit-staff/${data?._id}`);
                         // 6419cb3d5ab751646ea183b4
                        }}
                      >
                        View More
                      </Action>
                      {!data?.userId && checkPrivilege("6419ec4e5ab751646ea18437","6419cabd5ab751646ea1839a") && (
                        <Action
                          onClick={() => {
                            setId(data?._id);
                            dispatch(
                              convertStaffToUser(
                                data?._id,
                                setOpen,
                                setSuccessMessage,
                                setError,
                                setErrorMessage,
                                setLoading
                              )
                            );
                          }}
                        >
                          {loading && id === data?._id ? 'Loading...' : ' Convert Staff to User'}
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
            total={search?.length === 0 ? staffs?.length : search?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
