import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useForm, useFieldArray, Control, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Stack, Typography, Grid, TextField, FormHelperText, Button as MuButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createMemo, getAllMemo, updateMemo } from '../../../redux/actions/MemoAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import flattenArray from '../../../utils/flattenArray';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { capitalize } from '../../../utils/formatNumber';

const UpdateMemo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({});
  const [staffName, setStaffName] = useState('');

  const { loading, allMemo } = useSelector((state) => state?.memo);

  const { staffs } = useSelector((state) => state?.staff);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    console.log(filterStaff);
    console.log(id);

    setStaffName(capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName));

    return <p>{filterStaff[0]?.firstName}</p>;
  };

  const params = useParams();

  const memo = allMemo?.filter((item) => item?._id === params?.id);

  console.log(memo);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const { user } = useSelector((state) => state.auth);

  const memoCopies = memo[0]?.copies?.map((copy) => ({
    action: 'None',
    recipientId: copy.recipientId,
    status: 'true',
    remarks: '',
    _id: copy?._id,
  }));

  const schema = yup.object().shape({
    // memoDate: yup.date().required(),
    refId: yup.string().required(),
    memoTitle: yup.string().required(),
    memoBody: yup.string().required(),
    memoType: yup.string().required(),
    recipient: yup.object().required(),
    ownerId: yup.string().required(),
    recipientId: yup.string().required(),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      resolver: yupResolver(schema),
      copies: memoCopies,
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'copies',
    control,
  });

  console.log(moment(memo[0]?.createdAt).format('L'));

  console.log(memo[0]?.ownerId);

  const [memoData, setMemoData] = useState({
    // memoDate: moment(memo[0]?.createdAt).format('L'),
    memoTitle: memo[0]?.memoTitle,
    memoBody: memo[0]?.memoBody,
    ownerId: memo[0]?.ownerId,
  });

  const [recipient, setRecipient] = useState({
    recipientId: memo[0]?.recipient?.[0]?.recipientId,
    action: '',
    status: '',
    remarks: '',
  });

  const handleRecipientChange = ({ name, value }) => {
    setRecipient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormChange = ({ name, value }) => {
    setMemoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileDrop = (e) => {
    const { files } = e.target;
    // console.log(files);
    setFilters(files[0]);
  };

  const handleUpdateMemo = (data) => {
    const formData = new FormData();

    console.log(filters);
    const selected = {
      _id: params?.id,
      copies: filters?.name ? JSON.stringify(data?.copies) : data?.copies,
      ...memoData,
      recipient: filters?.name ? JSON.stringify(recipient) : recipient,
    };

    if (filters?.name) formData.append('filing', filters);

    Object.keys(selected).forEach((e) => {
      //   console.log(e, selected[e]);
      formData.append(e, selected[e]);
    });

    let isFormData;
    dispatch(
      updateMemo(
        filters?.name ? formData : selected,
        setOpen,
        setError,
        setErrorMessage,
        setSuccessMessage,
        filters?.name ? (isFormData = true) : (isFormData = false)
      )
    );
  };

  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllStaffs());
    getName(memo[0]?.ownerId);
  }, []);
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
      <Helmet>Update Memo | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Update Memo'} text={'Update and send memos to designated offices.'} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate('/dashboard/memo');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <FormCard
          onSubmit={handleSubmit((data) => {
            console.log(data);
            handleUpdateMemo(data);
          })}
        >
          <Title>Update Memo</Title>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
              <Stack>
                <InputLabel id="memo_title">
                  Memo title <span style={{ color: 'red' }}>*</span>{' '}
                </InputLabel>
                {errors?.memoTitle?.message && <FormHelperText error>{errors?.memoTitle?.message}</FormHelperText>}
                <GeneralInput
                  required
                  variant="outlined"
                  fullWidth
                  placeholder="Enter title"
                  value={memoData?.memoTitle}
                  name="memoTitle"
                  required
                  onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoTitle')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack>
                <InputLabel id="sent_from">
                  Sent from <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <GeneralInput
                  variant="outlined"
                  placeholder={staffName}
                  name="sentFrom"
                  required
                  onChange={(e) => handleFormChange(e.target)}
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                <InputLabel id="sent_to">
                  Sent to<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <GeneralInput
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                  value={recipient?.recipientId}
                  name="recipientId"
                  required
                  onChange={(e) => handleRecipientChange(e.target)}
                  // {...register('recipientId')}
                >
                  <option value="">Select Option</option>

                  {React.Children.toArray(
                    staffs?.map((staff) => (
                      <option value={staff?._id}>
                        {staff?.firstName} {staff?.lastName}
                      </option>
                    ))
                  )}
                </GeneralInput>
              </Stack>
            </Grid>
            {fields.map((field, index) => (
              <Fragment key={index}>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="action">
                      {`CC${index + 1}`}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <GeneralInput
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      // value={memoData?.cc1}
                      name="recipientId"
                      required
                      onChange={(e) => handleFormChange(e.target)}
                      {...register(`copies.${index}.recipientId`)}
                    >
                      <option value="">Select Option</option>
                      {React.Children.toArray(
                        staffs?.map((staff) => (
                          <option value={staff?._id}>
                            {staff?.firstName} {staff?.lastName}
                          </option>
                        ))
                      )}
                    </GeneralInput>
                  </Stack>
                </Grid>

                <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button
                    style={{
                      width: '55px',
                      height: '55px',
                      border: '1px solid #D0D0D0',
                      borderRadius: '11px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '30px',
                      // marginLeft: '1rem',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      remove(index);
                    }}
                  >
                    -
                  </button>
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
              </Fragment>
            ))}
          </Grid>

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
              <Stack>
                <InputLabel id="memo_body">
                  Memo body<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <TextField
                  name="memoBody"
                  // placeholder="Enter subject"
                  multiline
                  rows={8}
                  defaultValue="Enter subject"
                  // variant="filled"
                  value={memoData?.memoBody}
                  name="memoBody"
                  required
                  onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoBody')}
                  sx={{
                    background: '#fff',
                  }}
                />
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
            <MuButton variant="contained" component="label">
              {filters?.name ? filters?.name : 'Add Attachement'}
              <input
                hidden
                onChange={(e) => handleFileDrop(e)}
                ref={fileInputRef}
                name="filing"
                accept="image/*, .pdf, .doc"
                multiple
                type="file"
              />
            </MuButton>
            <button
              style={{
                width: '31.5%',
                height: '46px',

                borderRadius: '10px',
                border: '1px solid #14ADD6',
                background: '#fff',
                color: ' #14ADD6',
                cursor: 'pointer',
              }}
              type="submit"
            >
              {loading ? 'Loading...' : 'Update Memo'}
            </button>
          </Stack>
        </FormCard>
      </Wrapper>
    </>
  );
};

export default UpdateMemo;
