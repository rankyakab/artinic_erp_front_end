import React, { useEffect, useRef, useState } from 'react';
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
} from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Action } from '../../../../styles/main';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';

export const UserTable = ({ users, paginationPage, rowsPerPage, handleChangePage, page, search }) => {
  
  const navigate = useNavigate();
  
 const { roles, loading } = useSelector((state) => state.role);
 const [formData, setFormData] = useState(roles);



  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(()=>{
    
    
    let count =0;
    const userToRole = users.map(element =>{
      count+= 1;
      return  {id: element._id , key : count }
    });
  
   // console.log("this is the keys for forme",forme);
     console.log("this is the keys for users",users);
   setFormData( userToRole);
  },[]);

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

    const [selectedOption, setSelectedOption] = useState("");




  const tableHead = ['S/N', 'Email', 'Assign Role',];
  /*
  function handleSubmit(event, formId) {
  event.preventDefault();
  console.log("this is the submit to assigning role",{event, formId})
   console.log("this selected role",selectedRole)
}
*/
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
            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All User</Typography>
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
              {(search?.length === 0 ? users : search)
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{capitalize(data?.email)}</TableCell>
                

                    <TableCell>
                      <Action
                        onClick={() => {
                        //  setEditUser(data);
                          navigate(`/dashboard/edit-user/${data?._id}`);
                        }}
                      >
                        View More
                      </Action>
                      
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 5 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={search?.length === 0 ? users?.length : search?.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};
