import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import {
  Button,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { HeadCard, Wrapper } from '../../../styles/main';
import { TablePagination } from '../../../utils/memoPaginationUtil';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createAction, deleteAction, editAction, getAllAction } from '../../../redux/actions/ActionsAction';
import { capitalize } from '../../../utils/formatNumber';
import { GetStaffName } from '../../../utils/getValueById';
import { getAllStaffs } from '../../../redux/actions/StaffAction';

function Action() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { actions, loading } = useSelector((state) => state.action);
  const { staffs } = useSelector((state) => state.staff);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [actionData, setActionData] = useState({
    action: '',
  });

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };
  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const handleFormChange = ({ name, value }) => {
    setActionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tableHead = ['S/N', 'Action', 'Created By', 'Created At', 'Action'];

  const handleCreateAction = (e) => {
    e.preventDefault();
    if (editId === ' ') {
      dispatch(createAction(actionData, setErrorMessage, setSuccessMessage, setOpen, setError));
    } else {
      dispatch(editAction(editId, actionData, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing));
      setEditId(' ');
      setActionData((prev) => ({
        ...prev,
        action: '',
      }));
    }
  };

  useEffect(() => {
    dispatch(getAllAction());
    dispatch(getAllStaffs());
  });

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
      <Helmet>
        <title> Action |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Action'} text={'Create a new action'} />

        <HeadCard>
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%"
            component={'form'}
            onSubmit={handleCreateAction}
            spacing={6}
          >
            <input
              ref={inputRef}
              //   fullWidth
              value={actionData?.action}
              onChange={(e) => handleFormChange(e.target)}
              placeholder="Enter action"
              name="action"
              style={{
                marginBottom: 0,
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid #d0d0d0',
                borderRadius: '10px',
                width: '30%',
                height: '55px',
                outline: 'none',
                padding: '1rem',
              }}
            />
            <Button
              type="submit"
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              {loading ? 'Loading...' : editId !== ' ' ? 'Edit Action' : 'Create'}
            </Button>
          </Stack>
        </HeadCard>

        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All Action</Typography>
              <p>
                Showing <span>13</span> per page
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
                {actions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{capitalize(data?.action)}</TableCell>

                    <TableCell>{GetStaffName(data?.createdBy, staffs)}</TableCell>
                    <TableCell>{moment(data?.createdAt).format('L')}</TableCell>

                    <TableCell
                      sx={{
                        display: 'flex !important',
                        alignItems: 'center !important',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: ' #2d9cdb !important',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          inputRef.current.focus();
                          setActionData((prev) => ({
                            ...prev,
                            action: data?.action,
                          }));
                          setEditId(data?._id);
                        }}
                        role="presentation"
                      >
                        <Edit
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p>{editing && data?._id === editId ? 'editing...' : 'Edit'}</p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: ' #eb5757',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          dispatch(
                            deleteAction(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
                          );
                          setDeletingId(key);
                        }}
                        role="presentation"
                      >
                        <Delete
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p> {deleting && key === deletingId ? 'deleting...' : 'Delete'} </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack sx={{ my: 5 }}>
            <TablePagination
              paginationPage={paginationPage}
              total={actions?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      </Wrapper>
    </>
  );
}

export default Action;
