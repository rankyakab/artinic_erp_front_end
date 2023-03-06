import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
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
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action, Button } from '../../../../styles/main';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import EditProject from './EditProject';
import { deleteProjects } from '../../../../redux/actions/ProjectsAction';

export const AllProject = ({ projects }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);
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

  const tableHead = [
    'S/N',
    'Project Name',
    // 'ProjectManager',
    'Project Type',
    'Clients',
    'Budget',
    'Start Date',
    'End Date',
    'Status',
    'Action',
  ];

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
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>All Projects</Title>
            <Button
              onClick={() => {
                navigate('/dashboard/create_projects');
              }}
            >
              Create Project
            </Button>
          </Box>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
              {projects?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {key + 1}
                  </TableCell>
                  <TableCell>{data?.projectName}</TableCell>

                  <TableCell>
                    {data?.projectManager?.firstName} {data?.projectManager?.lastName}
                  </TableCell>

                  <TableCell>{data?.projectType?.typeName}</TableCell>
                  <TableCell>{data?.clientId?.companyName}</TableCell>
                  <TableCell>{data?.budget}</TableCell>
                  <TableCell>{data?.startDate}</TableCell>
                  <TableCell>{data?.endDate}</TableCell>
                  <TableCell>{data?.status}</TableCell>
                  <TableCell sx={{ display: 'flex' }}>
                    <Action onClick={handleOpen}>
                      <Edit sx={{ width: '1rem' }} />
                      Edit
                    </Action>
                    <Action
                      onClick={() => {
                        dispatch(
                          deleteProjects(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
                        );
                        setDeletingId(key);
                      }}
                      role="presentation"
                      sx={{ pl: 2, color: 'red' }}
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
            total={projects.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditProject />
      </Modal>
    </>
  );
};
