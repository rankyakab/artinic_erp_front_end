import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Stack,
  Modal,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action, FormCard } from '../../../../styles/main';
import { deleteProtype } from '../../../../redux/actions/ProtypeAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import EditType from './EditType';

export const TypeTable = ({ protype }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  console.log(deleting)
  const [deletingId, setDeletingId] = useState('');
  console.log(deletingId)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);
  console.log(setRowsPerPage);
  const [paginationPage, setPaginationPage] = useState(1);

  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

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
      <FormCard>
        <Box>
          <TableContainer component={Paper}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Title>All Project Types</Title>
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
                  <TableCell sx={{ width: '10%' }}>S/N</TableCell>
                  <TableCell>Project Type</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'flex-end', pr: 10 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {protype?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data?.typeName}</TableCell>

                    <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Action
                        onClick={handleOpen}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Edit sx={{ width: '1rem' }} />
                        Edit
                      </Action>
                      <Action
                        sx={{ pl: 2, color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onClick={() => {
                          dispatch(
                            deleteProtype(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
                          );
                          setDeletingId(key);
                        }}
                        role="presentation"
                      >
                        <Delete sx={{ width: '1rem' }} />
                        Delete
                      </Action>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ my: 2 }}>
            <TablePagination
              paginationPage={paginationPage}
              total={protype.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      </FormCard>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditType />
      </Modal>
    </>
  );
};
TypeTable.propTypes = {
  protype:PropTypes.any,
  
 
  
};