
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { alpha } from '@mui/material/styles';
import {  Paper, Container, Typography , Stack,  Grid, TextField, FormHelperText, Button as MuButton } from '@mui/material';
// import { Stack, StackTypeMap } from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
import { useForm, useFieldArray} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Title, GeneralInput, InputLabel } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
// import Iconify from '../../../components/iconify';

import { updateMemoStatus } from '../../../redux/actions/MemoAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { capitalize } from '../../../utils/formatNumber';
import { Block } from '../../../sections/_examples/Block';

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

   // console.log(filterStaff);
   // console.log(id);

    setStaffName(capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName));

    return <p>{filterStaff[0]?.firstName}</p>;
  };

  const params = useParams();

  const memo = allMemo?.filter((item) => item?._id === params?.id);

   // console.log("this is the memo",memo);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const { user } = useSelector((state) => state.auth);


  const schema = yup.object().shape({
    // memoDate: yup.date().required(),
    // refId: yup.string().required(),
    memoTitle: yup.string().required(),
    memoBody: yup.string().required(),
 //   memoType: yup.string().required(),
 //   recipient: yup.object().required(),
   // ownerId: yup.string().required(),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
   resolver: yupResolver(schema)
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'copies',
    control,
  });

  // ----------------------------------------------------------------------

const TIMELINES =memo[0]?.trail ? memo[0]?.trail: [];

// console.log(TIMELINES)
 //  console.log(moment(memo[0]?.createdAt).format('L'));

  // console.log(memo[0]?.ownerId);
    const [memoTitle, setMemoTitle] = useState('');



  const [memoData, setMemoData] = useState({
    // memoDate: moment(memo[0]?.createdAt).format('L'),
    memoTitle: memo[0]?.memoTitle,
    memoBody: memo[0]?.memoBody,
    ownerId: memo[0]?.ownerId,
    memoId: params?.id,
    attachment:"",
    status:"",
    remark:""
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
  const handleTitleChange = (title) => {
   // console.log({name, value})
    setMemoTitle(title );
  };
   function handleFileUpload(event) {
    const file = event.target.files[0];
    setMemoData((prevFormData) => ({
      ...prevFormData,
      attachment: file,
    }));
  }



  const handleFileDrop = (e) => {
    const { files } = e.target;
    // console.log(files);
    setFilters(files[0]);
  };

  const handleUpdateMemo = (data) => {
      const selected = {
     
      ...memoData,
    };

   console.log("these are captured with data",selected)
    dispatch(updateMemoStatus(selected, setOpen, setError, setErrorMessage, setSuccessMessage));
    /*
    const formData = new FormData();

    const selected = {
      ...data,
      _id: params?.id,
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

    */
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
        <DashboardHeader title={'Update Memo'} text={'Update and send memos to  the designated  offices.'} />
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
          onSubmit={handleSubmit(  handleUpdateMemo)}
        >
           <Title>Update Memo (Sent to:)</Title>
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
                  value= {memoData.memoTitle}
                  placeholder="Enter title"
                  name="memoTitle"
                   {...register('memoTitle')}
                  
                 onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoTitle')}
                />
              </Stack>



            </Grid>

          </Grid>
         

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
              <Stack>
                {errors?.memoBody?.message && <FormHelperText error>{errors?.memoBody?.message}</FormHelperText>}
               
                <InputLabel id="memo_body">
                  Memo body<span style={{ color: 'red' }}>*</span>
                </InputLabel>
               <TextField
                  multiline
                  rows={8}
                  required
                  variant="outlined"
                  fullWidth
                  value= {memoData.memoBody}
                ///  placeholder="Enter title"
                  name="memoBody"
                   {...register('memoBody')}
                  
                 onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoTitle')}
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
          {errors.attachment && <p>{errors.attachment.message}</p>}

            <MuButton variant="contained" component="label">
              {memoData?.attachment ? memoData?.attachment?.name  : 'Add Attachement'}
              <input
                hidden
                {...register('attachment')}
            //   onChange={(e) => handleFileDrop(e)}
              onChange={handleFileUpload}
                ref={fileInputRef}
                name="attachment"
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
              {loading ? 'Loading...' : 'Send Memo'}
            </button>
          </Stack>

          
          
        </FormCard>
        <Container sx={{ my: 10 }}>
        
        <Block title="Memo Trail">
           <Timeline position="">
            {TIMELINES.map((item) => (
              <TimelineItem key={item._id}>
                <TimelineOppositeContent>
                  <Typography variant="body2" sx={{ color: 'primary' }}>
                    {item.ownerId===user?.user?.staffId?(
                 

                  <Typography variant="body2" sx={{ color: 'success' }}>
                    {memo[0].updatedAt}
                  </Typography>
                  ):(
                      <Paper
                    sx={{
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                  >
                    <Typography variant="subtitle2">{item.memoTitle}</Typography>
                    <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {item.body}
                    </Typography>
                    
                       
                      <Button variant="outlined" startIcon={<PreviewIcon /> }>
                      View
                    </Button>
                     
                      
                    
                  </Paper>
                  )}
                  
                 
                  </Typography>
                </TimelineOppositeContent>


                <TimelineSeparator>
                  <TimelineDot color={item.color} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {item.ownerId===user?.user?.staffId?(
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                  >
                    <Typography variant="subtitle2">{item.memoTitle}</Typography>
                    <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {item.body}
                    </Typography>
                    
                       
                      <Button variant="outlined" startIcon={<PreviewIcon /> }>
                      View
                    </Button>
                     
                  </Paper>
                  ):(
                     <Typography variant="body2" sx={{ color: 'primary' }}>
                     {memo[0].updatedAt}
                  </Typography>
                  )}
                  
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Block>
      </Container>
      </Wrapper>
    </>
  );
};

export default UpdateMemo;