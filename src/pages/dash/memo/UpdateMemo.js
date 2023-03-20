
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { alpha } from '@mui/material/styles';
import {  Paper, Container, Typography , Stack,  Grid, TextField, FormHelperText,Badge, Button as MuButton } from '@mui/material';
// import { Stack, StackTypeMap } from '@material-ui/core';
// the updated
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useForm, useFieldArray} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useNavigate, useParams ,Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import PreviewIcon from '@mui/icons-material/Preview';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Title, GeneralInput, InputLabel } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
// import Iconify from '../../../components/iconify';

import { updateMemoStatus , getSingleMemo} from '../../../redux/actions/MemoAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { capitalize } from '../../../utils/formatNumber';
import { Block } from '../../../sections/_examples/Block';

const UpdateMemo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
    const params = useParams();
  const { loading, memo } = useSelector((state) => state?.memo);

  const { staffs } = useSelector((state) => state?.staff);



  

 //  const memo = allMemo?.filter((item) => item?._id === params?.id);

   // console.log("this is the memo",memo);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };
   const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

   // console.log(id);

   // console.log(filterStaff);

   return capitalize(`${filterStaff[0]?.firstName}  `) + capitalize(filterStaff[0]?.lastName);

  };

 const sectionColor = (item) =>{
let color = "";
 //  item = item.toLowerCase();
  if(item==="pending approval"){
    color = "#FFA500";
  } else if (item==="rejected") {
    color = "#ff0000";
  } else if (item==="comment") {
     color ="#0000ff";
  } else if (item==="approved"){
     color = "#008000";
  } else {
    color = "#FFA500";
  }
  return color;
 }


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

const TIMELINES =memo?.trail ? memo?.trail: [];

 // console.log(" Memo trail is here",TIMELINES)
 //  console.log(moment(memo[0]?.createdAt).format('L'));

  // console.log(memo[0]?.ownerId);
   // const [memoTitle, setMemoTitle] = useState('');



  const [memoData, setMemoData] = useState({
    // memoDate: moment(memo[0]?.createdAt).format('L'),
    memoTitle: memo?.memoTitle,
    memoBody: memo?.memoBody,
    ownerId: memo?.ownerId,
    memoId: params?.id,
    trail:memo?.trail,
    attachment:"",
    status:"pending approval",
    remarks:""
  });


 

  const handleFormChange = ({ name, value }) => {
    
    setMemoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   function handleFileUpload(event) {
    const file = event.target.files[0];
    setMemoData((prevFormData) => ({
      ...prevFormData,
      attachment: file,
    }));
  }

  const handleUpdateMemo = (data) => {
     
         let selected = '';
      let isFormData=true;
      if (memoData.attachment){
         isFormData=true;
          selected = new FormData();
         selected.append("trail", JSON.stringify("memoTitle", memoData.memoTitle));
         selected.append("trail", JSON.stringify("memoBody", memoData.memoBody));
          selected.append("trail", JSON.stringify("status", memoData.status));
           selected.append("trail", JSON.stringify("remarks", memoData.remarks));
            selected.append("trail", JSON.stringify("ownerId", memoData.ownerId));
               selected.append("trail", JSON.stringify("attachment", memoData.attachment));
          
      } else {
         isFormData=false;
         selected = {  
                   
                    ...memoData
                  
                 }

      }

    console.log("before you go meet wike",selected)

  // console.log("these are captured with data",selected)
//    dispatch(updateMemoStatus(selected, setOpen, setError, setErrorMessage, setSuccessMessage));
    
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
    dispatch(getSingleMemo(params.id));
   

  }, []);
   
  const statuscolor = sectionColor(memo.status)
 
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
                accept=".pdf"
                multiple
                type="file"
              />
            </MuButton>
            {memo?.status!=="pending approval" && (        
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
            </button>)}
 
          </Stack>

          
          
        </FormCard>
        <Container sx={{ my: 10 }}>
        
        <Block title="Memo Trail">
           <Timeline position="">
            
            {TIMELINES.map((item) => (
              
                 <TimelineItem key={item._id} >
                
                <TimelineOppositeContent>
                  
                 
                  <Typography variant="body2" sx={{ color: statuscolor }}>
                    {item.ownerId===user?.user?.staffId?(
                 
                  <>
                  <Badge color="secondary"  badgeContent={0} >
                    
                      <SignalWifiStatusbar4BarIcon color={statuscolor} />
                      {item.status}
                  
                  </Badge>
                  <Typography variant="body2" >
                    <Badge color="secondary"  badgeContent={0} >
                    
                      <AccessTimeFilledIcon color={statuscolor} />
                     {memo.updatedAt}
                  
                  </Badge>
                    
                  </Typography>
                  </>
                  
                  ):(
                      <Paper
                    sx={{
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {getName(item.ownerId)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: statuscolor }}>
                      {item?.remarks}
                    </Typography>
                    
                      
                      
                    
                      
                     
                      
                    
                  </Paper>
                  )}
                  
                 
                  </Typography>
                </TimelineOppositeContent>


                <TimelineSeparator>
                  <TimelineDot />
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
                    <Typography variant="subtitle2">{item?.memoTitle?.toUpperCase()}</Typography>
                   
                    <Typography variant="body2" sx={{ color: 'secondary' }}>
                      {item?.momoBody?.toUpperCase()}
                    </Typography>
                     <Button variant="outlined" startIcon={<PreviewIcon /> }>
                      <Link to="/newpage">View Details</Link>
                    </Button>
                     
                       
                    
                     
                      
                    
                  </Paper>
                  ):(
                     
                  <>
                  <Badge color="secondary" badgeContent={0} >
                    
                      <SignalWifiStatusbar4BarIcon color={statuscolor} />
                      {item.status}
                  
                  </Badge>
                  <Typography variant="body2" sx={{ color:statuscolor }}>
                    <Badge color="secondary" badgeContent={0} >
                    
                      <AccessTimeFilledIcon color={statuscolor} />
                     {memo.updatedAt}
                  
                  </Badge>
                      
                     

                  </Typography>
                  </>
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