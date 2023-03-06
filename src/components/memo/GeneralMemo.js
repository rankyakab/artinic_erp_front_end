import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Close, Save } from '@mui/icons-material';
import { useForm, useFieldArray, Control, useWatch } from 'react-hook-form';
import { Stack, Typography, Grid, TextField, Modal, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel } from '../../styles/main';
import Back from '../../assets/images/arrow_left.svg';
import { createMemo } from '../../redux/actions/MemoAction';

import './memo.css';

const drawerWidth = 150;

const styles = {
  drawer: {
    // width: ``,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '60% !important',
    height: '90% !important',
    backgroundColor: '#fff',
    color: '#3a3a3a',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      width: '5px',
      background: '#46c35f ',
      borderRadius: '2px ',
    },
  },
};

const GeneralMemo = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      activities: [
        {
          ccLevel: '',
          action: '',
          recipientId: '',
          status: '',
          remarks: '',
        },
      ],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'activities',
    control,
  });

  const { loading } = useSelector((state) => state?.memo);

  const [memoData, setMemoData] = useState({
    memoDate: '',
    refId: 'John Otor',
    memoTitle: '',
    memoBody: '',
    attachment: '',
    attachemntType: '',
    memoType: 'Operation Memo',
    completion: 'yes',
  });

  const handleFormChange = ({ name, value }) => {
    setMemoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  // const handleCreateMemo = (data) => {
  //   console.log(data);

  //   dispatch(createMemo(memoData));
  // };
  return (
    <Drawer
      open={open}
      className={styles.drawer}
      anchor="right"
      variant="temporary"
      classes={{
        paper: 'drawerPaper',
      }}
      transitionDuration={1500}
      sx={{ position: 'absolute', left: 0, width: '70px' }}
      //   onClose={handleClose}
      //   aria-labelledby="modal-modal-title"
      //   aria-describedby="modal-modal-description"
    >
      <Wrapper style={{ position: 'relative', padding: '1rem' }}>
        <Close
          sx={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
          onClick={() => {
            handleClose();
          }}
        />

        <FormCard
          sx={{ padding: '1rem 0rem', marginTop: '0rem' }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            const selected = {
              activities: data?.activities,
              ...memoData,
            };

            console.log(selected);
            dispatch(createMemo(selected));
          })}
        >
          <Title>Create Memo</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="memo_title">Memo title</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="Enter title"
                  value={memoData?.memoTitle}
                  name="memoTitle"
                  onChange={(e) => handleFormChange(e.target)}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="sent_from">Sent from</InputLabel>
                <GeneralInput
                  variant="outlined"
                  value={memoData?.refId}
                  name="sentFrom"
                  onChange={(e) => handleFormChange(e.target)}
                  disabled
                />
              </Stack>
            </Grid>
            {fields.map((field, index) => (
              <Fragment key={index}>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="sent_to">Sent to</InputLabel>
                    <GeneralInput
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      // value={memoData?.sentTo}
                      name="sentTo"
                      onChange={(e) => handleFormChange(e.target)}
                      {...register(`activities.${index}.ccLevel`)}
                    >
                      <option value="">Select Option</option>
                      <option value="option1">John Otor</option>
                      <option value="option1">Fatimah</option>
                    </GeneralInput>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="action">Action</InputLabel>
                    <GeneralInput
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      // value={memoData?.cc1}
                      name="action"
                      onChange={(e) => handleFormChange(e.target)}
                      {...register(`activities.${index}.action`)}
                    >
                      <option value="">Select Option</option>
                      <option value="option1">Approve</option>
                      <option value="option2">Comment</option>
                    </GeneralInput>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    style={{
                      width: '55px',
                      height: '55px',
                      border: '1px solid #D0D0D0',
                      borderRadius: '11px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '30px',
                      marginLeft: '1rem',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                  >
                    -
                  </button>
                </Grid>
              </Fragment>
            ))}

            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <button
                style={{
                  width: '55px',
                  height: '55px',
                  border: '1px solid #D0D0D0',
                  borderRadius: '11px',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '30px',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  append();
                }}
              >
                +
              </button>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Stack>
                <InputLabel id="date">Date</InputLabel>
                <GeneralInput
                  variant="outlined"
                  fullWidth
                  placeholder="DD/MM/YYYY"
                  value={memoData?.memoDate}
                  name="memoDate"
                  onChange={(e) => handleFormChange(e.target)}
                  type="date"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack>
                <InputLabel id="memo_body">Memo body</InputLabel>
                <TextField
                  name="memoBody"
                  // placeholder="Enter subject"
                  multiline
                  rows={8}
                  defaultValue="Enter subject"
                  // variant="filled"
                  value={memoData?.memoBody}
                  name="memoBody"
                  onChange={(e) => handleFormChange(e.target)}
                  sx={{
                    background: '#fff',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: '20px', padding: '0rem 2rem' }}
            spacing={4}
          >
            <Grid>
              <Typography variant="h4">Attachement</Typography>
            </Grid>
            <Grid>
              <Stack direction={'row'} spacing={2}>
                <Save />
                <Typography variant="p">Request for payment for aupply of office equipments</Typography>
              </Stack>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            sx={{
              mt: '71px',
            }}
            spacing={4}
          >
            <Button
              onClick={() => {
                handleClose();
                navigate('/dashboard/invoice-details');
              }}
              sx={{ width: '31.5%', mt: '10px' }}
            >
              {'Send Memo'}
            </Button>
          </Stack>
        </FormCard>
      </Wrapper>
    </Drawer>
  );
};

export default GeneralMemo;
