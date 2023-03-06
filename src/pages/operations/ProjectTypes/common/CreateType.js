import React, { useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProtype } from '../../../../redux/actions/ProtypeAction';
import { FormCard, Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';

const CreateType = () => {
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

  const dispatch = useDispatch();

  const handleCreateProtype = (e) => {
    e.preventDefault();
    dispatch(createProtype(protypeData, setErrorMessage, setSuccessMessage, setOpen, setError));
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

      <FormCard onSubmit={handleCreateProtype}>
        <Title>Create Project Types</Title>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Stack>
              <InputLabel id="type_name">Project Type Name</InputLabel>
              <GeneralInput
                variant="outlined"
                fullWidth
                onChange={(e) => handleFormChange(e.target)}
                placeholder="Project Type Name"
                name="typeName"
                value={protypeData?.typeName}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sx={{ pt: 4 }}>
            <Button type="submit" sx={{ width: '95%' }}>
              Create Project Type
            </Button>
          </Grid>
        </Grid>
      </FormCard>
    </>
  );
};

export default CreateType;
