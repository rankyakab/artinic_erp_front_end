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
import {getAllDepartment}from '../../../../redux/actions/DepartmentsAction';
import { convertStaffToUser, getAllStaffs,deleteStaffById } from '../../../../redux/actions/StaffAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';
import  CheckPrivilege  from '../../../auth/Checkprivilege';
import * as staffPrivilege from '../../../../utils/privilege/staff';
import { title } from '../../../../_mock/assets/text';


export const StaffTable = ({ staffs,positions, paginationPage, rowsPerPage, handleChangePage, page, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("position", positions)
   
  useEffect(()=>{
    getAllDepartment()
  },[])
  const { departments } = useSelector((state) => state.department);
   console.log("departments", departments)
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
   dispatch(deleteStaffById(memoId,setOpen, setSuccessMessage, setError, setErrorMessage, setLoading));
   

 }

  const handleClose = () => {
    setOpen(false);
    setError(false);
 navigate(0)
  };

  const handleClick = () => {
    handleClose();
  };

  // eslint-disable-next-line prefer-const
  let tableHead = ['S/N', 'First Name', 'Last Name', 'Gender', 'Staff ID', 'Phone Number', 'Designation','Department','Delete','Action'];
// tableHead=( checkPrivilege(staffPrivilege.CONVERT)||checkPrivilege(staffPrivilege.UPDATE) ) ?[...tableHead,'Action']:[...tableHead]
// tableHead= checkPrivilege(staffPrivilege.DELETE) ?[...tableHead,'Delete']:[...tableHead];
             
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
                {tableHead.map((td, key) => 
                   ( <TableCell key={key}>{td}</TableCell>)
                )}
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
                    <TableCell>
                       <button className="id-card-button">
                          {data?.staffNo}
                        </button>
                      </TableCell>
                    <TableCell>{data?.phoneNumber}</TableCell>

                    <TableCell>{capitalize(positions.find(pos=>pos._id===data?.staffPositionId)?.title)}</TableCell>
                     <TableCell>{capitalize(departments.find(dept=>dept._id===data?.department)?.department)||"Assign Department"}</TableCell>
                    <TableCell>  
            
                       <CheckPrivilege process = {staffPrivilege.CREATE[0]}  action = {staffPrivilege.CREATE[1]}>
                      <IconButton color="error" aria-label="delete" onClick={()=>deleteUserOnClick(data?._id)}>
                            <DeleteIcon />
                          </IconButton>
                       </CheckPrivilege>

                 </TableCell>
                   <TableCell>
                      
                        <CheckPrivilege process = {staffPrivilege.UPDATE[0]}  action = {staffPrivilege.CREATE[1]}>
                                <Action
                                    onClick={() => {
                                      setEditUser(data);
                                      navigate(`/dashboard/edit-staff/${data?._id}`);
                                    // 6419cb3d5ab751646ea183b4
                                    }}
                                  >
                                    View More
                                  </Action>
                       </CheckPrivilege>
                       
                       
                       <CheckPrivilege process = {staffPrivilege.CONVERT[0]}  action = {staffPrivilege.CREATE[1]} >
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
                     </CheckPrivilege>
                       
                       
                    
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
