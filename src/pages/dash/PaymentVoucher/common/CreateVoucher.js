import { Stack, Typography, Box, Button as MuButton, Grid, TextField, FormHelperText } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import {  Wrapper, Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
// import { PaymentVoucher } from './common/procurementTables';
import Back from '../../../../assets/images/arrow_left.svg';
import { PaymentVoucher } from './PaymentVoucherTable';
import { getAllStaffs } from '../../../../redux/actions/StaffAction';
import { createVoucher } from '../../../../redux/actions/VoucherAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';

const CreateVoucher = () => {
  const { user } = useSelector((state) => state.auth);
  const { voucherLoading } = useSelector((state) => state?.voucher);
  console.log(voucherLoading);
  const { staffs } = useSelector((state) => state?.staff);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [staffName, setStaffName] = useState('');

  const [voucherSheet1, setVoucherSheet1] = useState([]);

  const schema = yup.object().shape({
    refId: yup.string().required(),
    voucherTitle: yup.string().required(),
    body: yup.string().required(),
    recipient: yup.object().required(),
    ownerId: yup.string().required(),
    subject: yup.string().required(),
    recipientId: yup.string(),
    class: yup.string().required(),
    description: yup.string().required(),
    qty: yup.number().required(),
    unitPrice: yup.number().required(),
    amount: yup.number().required(),
    vat: yup.number().required().max(10),
    vatAmount: yup.number().required(),
    grossAmount: yup.number().required(),
    whtRate: yup.number().required(),
    whtAmount: yup.number().required(),
    netAmount: yup.number().required(),
    beneficiaryAccountNumber: yup.number().required(),
    beneficiaryAccountName: yup.string().required(),
    beneficiaryBank: yup.string().required(),
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      resolver: yupResolver(schema),
      copies: [
        
      ],
      voucherTotals: {
        totalAmount: '',
        vatAmount: '',
        grossAmount: '',
        whtAmount: '',
        netAmount: '',
      },
      voucherSheet: [
        {
          class: '',
          description: '',
          qty: '',
          unitPrice: '',
          amount: '',
          vat: '',
          vatAmount: '',
          grossAmount: '',
          whtRate: '',
          whtAmount: '',
          netAmount: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'copies',
    control,
  });

  const fieldArray = useFieldArray({
    name: 'voucherSheet',
    control,
  });

  const [voucherData, setVoucherData] = useState({
    beneficiaryAccountNumber: '',
    beneficiaryAccountName: '',
    beneficiaryBank: '',
    body: '',
    completion: 'true',
    subject:"",
    preparedBy: user?.user?.staffId,
    recipientId: '',
  });

  const [recipient, setRecipient] = useState({
    recipientId: '',
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
    console.log(name, value);
    setVoucherData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileDrop = (e) => {
    const { files } = e.target;
    console.log(files);
    setFilters(files[0]);
  };

  const handleCreateVoucher = (data) => {
    const copies =data.copies.map(item=>item.recipientId);
    const voucherTotals={ ...data.voucherTotals};
    const voucherSheet =[...data.voucherSheet];
    const selected = {
      
      ...voucherData,
       ...voucherTotals,
      copies,
      voucherSheet
     
    };
  console.log("this is the selected ones begining **********");
    console.log("this is the selected ones ",selected);

     console.log("this is the selected ones ending **********");
       console.log("this is the selected ones ending **********");

   dispatch(createVoucher(selected, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  const getStaffName = (id) => {
    //   const { staffs } = useSelector((state) => state.staff);

   // console.log(id);

    const filterStaff = staffs?.filter((staff) => staff?._id === id);
    console.log("this is the staff object", filterStaff)
    setStaffName(capitalize(filterStaff[0]?.firstName) + capitalize(filterStaff[0]?.lastName));

    return '';
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  useEffect(() => {
    dispatch(getAllStaffs());
    console.log("the user id ", user?.user?.staffId);
    getStaffName(user?.user?.staffId);
  }, []);

  useEffect(() => {
  //  console.log('nnnn');

    fieldArray?.fields?.forEach((sheet, index) => {
      const qty = watch(`voucherSheet[${index}].qty`);
      const unitPrice = watch(`voucherSheet[${index}].unitPrice`);
      const vat = watch(`voucherSheet[${index}].vat`);
      const whtRate = watch(`voucherSheet[${index}].whtRate`);

      setValue(`voucherSheet[${index}].amount`, +qty * +unitPrice);

      setValue(`voucherSheet[${index}].vatAmount`, (vat / 100) * (qty * unitPrice));

      setValue(`voucherSheet[${index}].grossAmount`, (vat / 100) * (qty * unitPrice) + qty * unitPrice);

      setValue(`voucherSheet[${index}].whtAmount`, (whtRate / 100) * (qty * unitPrice));

      setValue(
        `voucherSheet[${index}].netAmount`,
        (qty * unitPrice + (vat / 100) * (qty * unitPrice)) / ((whtRate / 100) * (qty * unitPrice))
      );

      const prices = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].amount`);
      });

      const subTotal = prices?.reduce((acc, cur) => acc + cur, 0);

      setValue(`voucherTotals.totalAmount`, subTotal);

      const vatFields = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].vatAmount`);
      });

      const vatTotal = vatFields?.reduce((acc, cur) => acc + cur, 0);

      // console.log(vatTotal);

      setValue(`voucherTotals.vatAmount`, vatTotal);

      const grossFields = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].grossAmount`);
      });

      const grossTotal = grossFields?.reduce((acc, cur) => acc + cur, 0);

      // console.log(grossTotal);

      setValue(`voucherTotals.grossAmount`, grossTotal);

      const whtFields = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].whtAmount`);
      });

      const whtTotal = whtFields?.reduce((acc, cur) => acc + cur, 0);

      setValue(`voucherTotals.whtAmount`, whtTotal);

      const netFields = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].netAmount`);
      });

      const netTotal = netFields?.reduce((acc, cur) => acc + cur, 0);

      console.log(netTotal);

      setValue(`voucherTotals.netAmount`, netTotal);
    });
  }, [fieldArray, watch, setValue]);

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
      <Helmet>Payment Voucher | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Payment Voucher'} text={'Create account for a new staff'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <form
          onSubmit={handleSubmit((data) => {
            // e.preventDefault();
           //  console.log(data);
            handleCreateVoucher(data);
            // const formData = new FormData();

            // console.log(filters);
            // const selected = {
            //   copies: data?.copies,
            //   ...voucherData,
            //   recipient,
            //   voucherSheet: data?.voucherSheet,
            // };

            // console.log(selected);
            // formData.append('filing', filters);

            // Object.keys(selected).forEach((e) => {
            //   console.log(e, selected[e]);
            //   formData.append(e, JSON.stringify(selected[e]));
            // });
          })}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '20px',
              marginTop: '2rem',
            }}
          >
            <Title>Create Payment Voucher</Title>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12} md={12}>
                <Stack>
                  <InputLabel id="memo_title">
                    Subject <span style={{ color: 'red' }}>*</span>{' '}
                  </InputLabel>
                  {errors?.subject?.message && <FormHelperText error>{errors?.voucherTitle?.message}</FormHelperText>}
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter title"
                    value={voucherData?.subject}
                    name="subject"
                    type="text"
                    required
                    onChange={(e) => handleFormChange(e.target)}
                //     {...register('voucherTitle')}
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
                  //  {...register('sentFrom')}
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
                    value={voucherData?.recipientId}
                    name="recipientId"
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
                        // value={voucherData?.cc1}
                       name="copies"
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

                  <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                      remove('copies', index);
                      }}
                    >
                      -
                    </button>

                  </Grid>
                </Fragment>
              ))}






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
                    onClick={() => {
          append('copies', { recipientId: '', description: '' });
        }}
                    onClick={(e) => {
                      e.preventDefault();
                        append('copies', {
         
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
            </Grid>
  
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12} md={12}>
                <Stack>
                  <InputLabel id="memo_body">
                    Body<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <TextField
                    // placeholder="Enter subject"
                    multiline
                    rows={8}
                    placeholder="Enter subject"
                    // variant="filled"
                    value={voucherData?.body}
                    name="body"
                    required
                    onChange={(e) => handleFormChange(e.target)}
                   //  {...register('memoBody')}
                    sx={{
                      background: '#fff',
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '20px',
              marginTop: '2rem',
            }}
          >
            <PaymentVoucher
              voucherData={voucherSheet1}
              register={register}
              fieldArray={fieldArray}
              handleFormChange={handleFormChange}
            />

            <Box sx={{ fontSize: 15, my: 5 }}>
              <Typography>Net amount in words: </Typography>
            </Box>

            <Box>
              <Title sx={{ fontSize: 15, mb: 3 }}>Beneficiary Payment Details</Title>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="last_name">
                      Account name<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <GeneralInput
                      required
                      onChange={(e) => handleFormChange(e.target)}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Name"
                      name="beneficiaryAccountName"
                      value={voucherData?.beneficiaryAccountName}
                     //  {...register('beneficiaryAccountName')}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="last_name">
                      Account number<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <GeneralInput
                      required
                      onChange={(e) => handleFormChange(e.target)}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Number"
                      onChange={(e) => handleFormChange(e.target)}
                      variant="outlined"
                      fullWidth
                      name="beneficiaryAccountNumber"
                      value={voucherData?.beneficiaryAccountNumber}
                    //  {...register('beneficiaryAccountNumber')}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack>
                    <InputLabel id="last_name">
                      Bank name<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <GeneralInput
                      required
                      onChange={(e) => handleFormChange(e.target)}
                      variant="outlined"
                      fullWidth
                      placeholder="Enter bank name"
                      onChange={(e) => handleFormChange(e.target)}
                      variant="outlined"
                      fullWidth
                      name="beneficiaryBank"
                      value={voucherData?.beneficiaryBank}

                    //  {...register('beneficiaryBank')}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '37%', mt: 3, mb: 5 }}>
              <Button type="submit">{voucherLoading ? 'Loading...' : 'Save and Send for Approval'}</Button>
            </Box>
          </Box>
        </form>
      </Wrapper>
    </>
  );
};

export default CreateVoucher;
