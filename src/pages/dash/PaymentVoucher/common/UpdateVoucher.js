import { Stack, Typography, Box, Button as MuButton, Grid, TextField, FormHelperText } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';

import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import { FormCard, Wrapper, Button, Title, GeneralInput, InputLabel } from '../../../../styles/main';
// import { PaymentVoucher } from './common/procurementTables';
import Back from '../../../../assets/images/arrow_left.svg';
import { PaymentVoucher } from './PaymentVoucherTable';
import { createMemo } from '../../../../redux/actions/MemoAction';
import { getAllStaffs } from '../../../../redux/actions/StaffAction';
import { createVoucher, updateVoucher } from '../../../../redux/actions/VoucherAction';
import SuccessCard from '../../../../components/SuccessCard';
import ErrorCard from '../../../../components/ErrorCard';
import { capitalize } from '../../../../utils/formatNumber';

const UpdateVoucher = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state?.memo);
  const { staffs } = useSelector((state) => state?.staff);

  const { vouchers } = useSelector((state) => state?.voucher);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [staffName, setStaffName] = useState('');

  const params = useParams();

  const voucher = vouchers?.filter((item) => item?._id === params?.id);

  console.log(voucher);
  console.log(params);

  const voucherSheetCopies = voucher[0]?.voucherSheet?.map((voucher) => ({
    class: voucher?.class,
    description: voucher?.description,
    qty: voucher?.qty,
    unitPrice: voucher?.unitPrice,
    amount: voucher?.amount,
    vat: voucher?.vat,
    vatAmount: voucher?.vatAmount,
    grossAmount: voucher?.grossAmount,
    whtRate: voucher?.whtRate,
    whtAmount: voucher?.whtAmount,
    netAmount: voucher?.netAmount,
    _id: voucher?._id,
  }));

  console.log(voucherSheetCopies);

  const vouchersCopies = vouchers[0]?.copies?.map((copy) => ({
    action: 'None',
    recipientId: copy?.recipientId,
    status: 'true',
    remarks: '',
  }));

  const schema = yup.object().shape({
    refId: yup.string().required(),
    memoTitle: yup.string().required(),
    recipient: yup.object().required(),
    ownerId: yup.string().required(),
    subject: yup.string().required(),
    recipientId: yup.string(),
    class: yup.string().required(),
    description: yup.string().required(),
    qty: yup.string().required(),
    unitPrice: yup.number().required(),
    amount: yup.number().required(),
    vat: yup.string().required(),
    vatAmount: yup.number().required(),
    grossAmount: yup.number().required(),
    whtRate: yup.string().required(),
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
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      resolver: yupResolver(schema),
      copies: vouchersCopies,
      voucherSheet: voucherSheetCopies,
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    name: 'copies',
    control,
  });

  const fieldArray = useFieldArray({
    name: 'voucherSheet',
    control,
  });

  const [voucherData, setVoucherData] = useState({
    beneficiaryAccountNumber: voucher[0]?.beneficiaryAccountNumber,
    beneficiaryAccountName: voucher[0]?.beneficiaryAccountName,
    beneficiaryBank: voucher[0]?.beneficiaryBank,
    subject: voucher[0]?.subject,

    completion: 'true',
    preparedBy: user?.user?._id,
  });

  const [recipient, setRecipient] = useState({
    recipientId: voucher[0]?.recipient?.[0]?.recipientId,
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
    const selected = {
      _id: params?.id,
      copies: data?.copies,
      ...voucherData,
      recipient,
      voucherSheet: data?.voucherSheet,
    };

    console.log(selected);

    dispatch(updateVoucher(selected, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  const getStaffName = (id) => {
    //   const { staffs } = useSelector((state) => state.staff);

    console.log(id);

    const filterStaff = staffs?.filter((staff) => staff?._id === id);

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
    getStaffName(user?.user?.staffId);
  }, []);

  useEffect(() => {
    console.log('nnnn');

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

      console.log(vatTotal);

      setValue(`voucherTotals.vatAmount`, vatTotal);

      const grossFields = fieldArray?.fields?.map((description, index) => {
        return getValues(`voucherSheet[${index}].grossAmount`);
      });

      const grossTotal = grossFields?.reduce((acc, cur) => acc + cur, 0);

      console.log(grossTotal);

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
        <DashboardHeader title={'Update Voucher'} text={'Update payment voucher'} />

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
            console.log(data);
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
            <Title>Update Payment Voucher</Title>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12} md={12}>
                <Stack>
                  <InputLabel id="memo_title">
                    Subject <span style={{ color: 'red' }}>*</span>{' '}
                  </InputLabel>
                  {errors?.subject?.message && <FormHelperText error>{errors?.subject?.message}</FormHelperText>}
                  <GeneralInput
                    required
                    variant="outlined"
                    fullWidth
                    placeholder="Enter title"
                    value={voucherData?.subject}
                    name="subject"
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
                    value={staffName}
                    name="sentFrom"
                    required
                    onChange={(e) => handleFormChange(e.target)}
                    disabled
                    // {...register('refId')}
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
                        // value={voucherData?.cc1}
                        name="recipientId"
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
            {/* 
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
                    defaultValue="Enter subject"
                    // variant="filled"
                    value={voucherData?.body}
                    name="body"
                    required
                    onChange={(e) => handleFormChange(e.target)}
                    // {...register('memoBody')}
                    sx={{
                      background: '#fff',
                    }}
                  />
                </Stack>
              </Grid>
            </Grid> */}
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
              voucherData={voucherData}
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
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '37%', mt: 3, mb: 5 }}>
              <Button type="submit">{loading ? 'Loading...' : 'Update Voucher'}</Button>
            </Box>
          </Box>
        </form>
      </Wrapper>
    </>
  );
};

export default UpdateVoucher;
