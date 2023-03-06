import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel, OutlinedButton } from '../../../../styles/main';
import { editProtype, getAllProtype } from '../../../../redux/actions/ProtypeAction';

const EditType = () => {
  const dispatch = useDispatch();
  const { protype, loading } = useSelector((state) => state.protype);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [protypeData, setProtypeData] = useState({
    typeName: '',
  });

  const handleFormChange = ({ name, value }) => {
    setProtypeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const navigate = useNavigate();

  const handleEditProtype = (e) => {
    e.preventDefault();
    dispatch(editProtype(editId, protypeData, setErrorMessage, setSuccessMessage, setOpen, setError, setEditing));
    setEditId(' ');
    setProtypeData((prev) => ({
      ...prev,
      typeName: '',
    }));
  };

  useEffect(() => {
    dispatch(getAllProtype());
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
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

      <Box sx={style}>
        {/* <FormCard onSubmit={handleCreateProtype}> */}
        <FormCard onSubmit={handleEditProtype}>
          <Title>Edit Project Types</Title>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Stack>
                <InputLabel id="type_name">Project Type Name</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  onChange={(e) => handleFormChange(e.target)}
                  placeholder="Edit Project Type Name"
                  name="typeName"
                  value={protypeData?.typeName}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ pb: 5 }}>
              <Button type="submit" sx={{ width: '95%' }}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </FormCard>
      </Box>
    </>
  );
};

export default EditType;
