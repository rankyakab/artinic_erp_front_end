import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Stack, Typography, Grid, TextField, FormHelperText, Button as MuButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Title, GeneralInput, InputLabel } from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';
import { createMemo } from '../../../redux/actions/MemoAction';
import { getAllStaffs } from '../../../redux/actions/StaffAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { capitalize } from '../../../utils/formatNumber';

const CreateMemo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({});
  const [staffName, setStaffName] = useState('');

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
    setError(false);
      navigate(-1);
  };

  const { user } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    memoTitle: yup.string().required(),
    memoBody: yup.string().required(),
    attachment: yup.mixed(),
    recipientId: yup.string(),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
   
      resolver: yupResolver(schema)
      
  });

  const { fields, append, remove } = useFieldArray({
    name: 'copies',
    control,
  });

  const { loading } = useSelector((state) => state?.memo);

  const { staffs } = useSelector((state) => state?.staff);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

   // console.log(filterStaff);
   // console.log(id);

    setStaffName(capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName));

    return <p>{filterStaff[0]?.firstName}</p>;
  };
const [memoData, setMemoData] = useState({
    // memoDate: '',
    memoTitle: '',
    memoBody: '',
    attachment: '',
    ownerId: user?.user?.staffId,
    recipientId: ""
    
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



  

  const handleFileDrop = (e) => {
    const { files } = e.target;
  //  console.log(files);
    setFilters(files[0]);
  };

  const handleCreateMemo = (data) => {

     console.log ("the main the main");
      console.log ("datea",data);
    console.log (data);
    //  const selected={...data, ownerId:memoData.ownerId, attachment:memoData.attachment};
      const copies = data.copies ?  data.copies.map(copy => copy.recipientId):[];
      let selected = '';
      let isFormData=true;
      if (memoData.attachment){
        console.log("this is the attachemnt",memoData.attachment)
         isFormData=true;

          selected = new FormData();
            
          selected.append("memoTitle", memoData.memoTitle);
          selected.append("memoBody", memoData.memoBody);
          selected.append("attachment", memoData.attachment);
          selected.append("ownerId", memoData.ownerId);
          selected.append("recipientId", memoData.recipientId);
          selected.append("copies", JSON.stringify(copies));
          selected.append("status", "pending approval");
          selected.append("trail", JSON.stringify([{ 
                                    memoTitle: memoData.memoTitle,
                                    memoBody: memoData.memoBody,
                                    status: "pending approval" ,
                                    remarks:  "" ,
                                    ownerId: memoData.ownerId,
                                
                                  }]));
      } else {
         isFormData=false;
         selected = {  
                    ownerId: memoData.ownerId,
                    recipientId: memoData.recipientId,
                    attachment:"", 
                    memoBody: memoData.memoBody,
                    memoTitle: memoData.memoTitle,
                    status : "pending approval",
                    trail :[
                  
                            { 
                              memoTitle:memoData.memoTitle,
                              memoBody: memoData.memoBody,
                              attachment:"", 
                              status: "pending approval" ,
                              remarks:  "" ,
                              ownerId: memoData.ownerId,
                          
                            },
                            
                            
                            ],

                    copies
                    
       }

      }

    
 console.log("make this happen",{...selected});
     isFormData = true;

    dispatch(
      createMemo(
        {...selected},
        setOpen,
        setError,
        setErrorMessage,
        isFormData
      )
    
    );
      
  };



  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllStaffs());
    getName(user?.user?.staffId);
  }, []);

  return (
    <>
      <SuccessCard
        open={open}
        handleClose={handleClose}
        message="You have successfully added a new memo"
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
      <Helmet>Create Memo | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Create Memo'} text={'Create and send memos to designated offices.'} />
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
          onSubmit={handleSubmit(handleCreateMemo)}
        >
          <Title>Create Memo</Title>
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
                  name="memoTitle"
                   {...register('memoTitle')}
                  
                 onChange={(e) => handleFormChange(e.target)}
                  // {...register('memoTitle')}
                />
              </Stack>



            </Grid>

            <Grid item xs={12} md={6}>
              <Stack>
                 {errors?.ownerId?.message && <FormHelperText error>{errors?.ownerId?.message}</FormHelperText>}
                <InputLabel id="sent_from">
                  Sent from <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <GeneralInput
                  variant="outlined" 
                //  {...register('ownerId')}
                  placeholder={staffName}
                  name="ownerId"
                  required
                 // value= {memoData.ownerId}
                 // onChange={(e) => handleFormChange(e.target)}
                 
                  disabled
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack>
                {errors?.recipientId?.message && <FormHelperText error>{errors?.recipientId?.message}</FormHelperText>}
                <InputLabel id="sent_to">
                  Sent to<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <GeneralInput
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                //   value={recipient?.recipientId}
                 value={memoData.recipientId}
                  name="recipientId"
                  {...register('recipientId')}
                  required
                  onChange={(e) => handleFormChange(e.target)}
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
              <Fragment key={field.id}>
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
                    type="button"
                    disabled={false}
                    onClick={() => {

                   remove(index);
                    }}
                  >
                    -
                  </button>
                
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
              <Stack>
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
                    type="button"
                    disabled={false}
                    onClick={(e) => {
                      e.preventDefault();
                       append({
         
                                                      action: 'None',
                                                      recipientId: '',
                                                      status: 'true',
                                                      remarks: '',
                                                    });
                    }}
                  >
                   CC+
                  </button>
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
            //    {...register('attachment')}
            //   onChange={(e) => handleFileDrop(e)}
              onChange={handleFileUpload}
                ref={fileInputRef}
                name="attachment"
                accept=" .pdf"
               
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
      </Wrapper>
    </>
  );
};

export default CreateMemo;
