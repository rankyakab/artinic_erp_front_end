import React, { useEffect, useRef, useState } from 'react';
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
  Select,
  FormControl,
  Input,
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { HeadCard, Wrapper } from '../../../styles/main';
import { TablePagination } from '../../../utils/memoPaginationUtil';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createProcess, deleteProcess, editProcess, getAllProcess } from '../../../redux/actions/ProcessAction';
import { capitalize } from '../../../utils/formatNumber';
import { GetActionName, GetStaffName } from '../../../utils/getValueById';
import { getAllAction } from '../../../redux/actions/ActionsAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';

function Process() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { processes, loading } = useSelector((state) => state.process);
  const { actions } = useSelector((state) => state.action);
  const { staffs } = useSelector((state) => state.staff);

  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [editing, setEditing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [selectedAction, setSelectedAction] = useState([]);

  const [processData, setProcessData] = useState({
    process: '',
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
    setProcessData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tableHead = ['S/N', 'Process', 'Created By', 'Created At', 'Actions', 'Action'];

  const handleCreateProcess = (e) => {
    e.preventDefault();
    const data = {
      ...processData,
      action: selectedAction,
    };
   // console.log(data);
    if (editId === '') {
      dispatch(createProcess(data, setErrorMessage, setSuccessMessage, setOpen, setError));
      setSelectedAction([]);
      setEditId('');
      setProcessData((prev) => ({
        ...prev,
        process: '',
      }));
    } else {
      dispatch(editProcess(editId, data, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing));
      setOpenEdit(false);
      setSelectedAction([]);
      setEditId(' ');
      setProcessData((prev) => ({
        ...prev,
        process: '',
      }));
    }
  };

  useEffect(() => {
    dispatch(getAllProcess());
    dispatch(getAllAction());
    dispatch(getAllStaffs());
  }, []);
  // console.log(processes);
  // console.log(actions);
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
        <title> Process |Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'Process'} text={'Create a new process'} />

        <HeadCard>
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%"
            component={'form'}
            onSubmit={handleCreateProcess}
            spacing={6}
          >
            <input
              ref={inputRef}
              //   fullWidth
              placeholder="Enter process"
              name="process"
              value={processData?.process}
              onChange={(e) => handleFormChange(e.target)}
              style={{
                marginBottom: 0,
                display: 'flex',
                justifyContent: 'center',
                border: '1px solid #d0d0d0',
                borderRadius: '10px',
                width: '100%',
                height: '55px',
                outline: 'none',
                padding: '1rem',
              }}
            />

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
                Action
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
                  Select actions
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
                label="Action"
                placeholder="Select actions"
                input={<Input />}
                // inputProps={{ shrink: true }}
              >
                <MenuItem disabled value="">
                  <em>Select actions</em>
                </MenuItem>
                {actions.map((action) => (
                  <MenuItem key={action?._id} value={action?._id}>
                    {action?.action}
                  </MenuItem>
                ))}
              </Select>
           
            </FormControl>

            <Button
              type="submit"
              sx={{ color: 'white', background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)', py: 1.5, px: 5 }}
            >
              {loading ? 'Loading...' : editId !== '' ? 'Edit' : 'Create'}
            </Button>
          </Stack>
        </HeadCard>

        <Box sx={{ my: 3 }}>
          <TableContainer component={Paper} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}> All Process</Typography>
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
                {processes?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                  <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{capitalize(data?.process)}</TableCell>
                    <TableCell>{GetStaffName(data?.createdBy, staffs)}</TableCell>
                    <TableCell>{moment(data?.createdAt).format('L')}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        {React.Children.toArray(
                          data?.action?.map((act) => <p style={{ margin: '0px' }}>{GetActionName(act, actions)}</p>)
                        )}
                      </Box>
                    </TableCell>
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
                          setProcessData((prev) => ({
                            ...prev,
                            process: data?.process,
                          }));
                          setSelectedAction(data?.action);
                          setEditId(data?._id);
                          //   setOpenEdit(true);
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
                        role="presentation"
                        onClick={() => {
                          dispatch(
                            deleteProcess(data?._id, setErrorMessage, setSuccessMessage, setOpen, setError, setDeleting)
                          );
                          setDeletingId(key);
                        }}
                      >
                        <Delete
                          sx={{
                            margin: ' 0px 10px',
                          }}
                        />
                        <p>{deleting && key === deletingId ? 'deleting...' : 'Delete'}</p>
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
              total={processes?.length}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Box>
      </Wrapper>
    </>
  );
}

export default Process;
