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
 FormControl,
 Select,
 Input,
  MenuItem,
  Button,
} from '@mui/material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';

import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';

export const UserTable = ({ users, paginationPage, rowsPerPage, handleChangePage, page, search }) => {
   const [processData, setProcessData] = useState({
    process: '',
  });
 const { roles, loading } = useSelector((state) => state.role);
const inputRef = useRef();
 // const [loading, setLoading] = useState(false);
   const [selectedAction, setSelectedAction] = useState([]);
 const [editId, setEditId] = useState('');

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleAssignRole = () => {
   const je = "";
   return je;
  }
const handleFormChange = (element)=> element;

  const tableHead = ['S/N', 'Email', 'Assign Role',];

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
                     <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%"
            component={'form'}
            onSubmit={handleAssignRole}
            spacing={6}
          >
            

            <FormControl
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                border: '1px solid #ADB7BE',
                borderRadius: '4px',
                height: '55px',
                padding: '.8rem 0',
                color: '#ADB7BE',
                fontWeight: '400',
                fontSize: '12px',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-.6rem',
                  marginLeft: '.5rem',
                  padding: '0rem .5rem',
                  background: '#FFFFFF',
                }}
                id="demo-mutiple-chip-label"
              >
                Assignment
              </span>

              {selectedAction.length === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    padding: '.5rem',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '16px',
                    color: '#000',
                  }}
                >
                  Select Role
                </span>
              )}

              <Select
                multiple
                id="demo-mutiple-chip"
                disableUnderline
                style={{
                  width: '100%',
                  paddingLeft: '1rem',
                  outline: 'none',
                }}
                value={selectedAction}
                onChange={(e) => {
                  const check = selectedAction.find((id) => e.target.value === id);
                  if (!check) {
                    setSelectedAction(e.target.value);
                  }
                }}
                label="Roles"
                placeholder="Select role"
                input={<Input />}
                // inputProps={{ shrink: true }}
              >
                <MenuItem disabled value="">
                  <em>Select actions</em>
                </MenuItem>
                {roles.map((action) => (
                  <MenuItem key={action?._id} value={action?._id}>
                    {action?.role}
                  </MenuItem>
                ))}
              </Select>
           
            </FormControl>

            <Button
              type="submit"
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              {loading ? 'Loading...' : editId !== '' ? 'Edit' : 'Assign '}
            </Button>
          </Stack>
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
