import React, { useState } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { styled } from '@mui/material/styles';
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
import { deleteClients } from '../../../../redux/actions/ClientsAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import EditClients from './EditClients';

export const ClientTable = ({ clients }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ setDeleting] = useState(false);
  const [setDeletingId] = useState('');

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

  const tableHead = ['S/N', 'Company', ' Email Address', 'Company Address', 'Phone Number', 'Action'];

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
              <Title>All Clients</Title>
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
                {clients?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{data?.companyName}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data?.companyAddress}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>
                    <TableCell sx={{ display: 'flex' }}>
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
                            deleteClients(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
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
              total={clients.length}
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
        <EditClients />
      </Modal>
    </>
  );
};

ClientTable.propTypes = {
  clients:PropTypes.any,
  
 
  
};
