import React, { useState, useEffect, Fragment } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Divider,
  Box,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import Back from '../../../assets/images/arrow_left.svg';

import {
  Wrapper,
  InputLabel,
  GeneralInput,
  HeadCard,
  Title,
  Button,
  InvoiceSelect,
  VoucherInput,
} from '../../../styles/main';
import GeneralMemo from '../../../components/memo/GeneralMemo';
import { formatNumber } from '../../../utils/formatNumber';
import { getAllProjects } from '../../../redux/actions/ProjectsAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
import { createInvoices } from '../../../redux/actions/InvoiceAction';

function AddInvoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const [successMessage, setSuccessMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loading } = useSelector((state) => state.invoice);

  const [invoiceData, setInvoiceData] = useState({
    createdBy: user?.user?.staffId,
  });

  const [toatalAmount, setTotalAmount] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleFormChange = ({ name, value }) => {
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const schema = yup.object().shape({
    description: yup.string().required(),
    quantity: yup.number().required(),
    unitPrice: yup.number().required(),
    totalPrice: yup.number().required(),

    projectId: yup.string().required(),
    totalWord: yup.string().required(),
    accountName: yup.string().required(),
    subject: yup.string().required(),
    billTo: yup.string().required(),
    bankName: yup.string().required(),
    currency: yup.string().required(),
    sortCode: yup.string().required(),
    accountNumber: yup.number().required(),
    vat: yup.number().required(),
    wht: yup.number().required(),
    subTotal: yup.number().required(),
    total: yup.number().required(),
    discount: yup.number().required(),
    ibanNumber: yup.string(),
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

      invoiceValues: {
        projectId: '',
        billTo: '',
        subject: '',
        vat: '',
        vatPercentage: 0,
        whtPercentage: 0,
        wht: '',
        discount: '',
        discountValue: 0,
        subTotal: '',
        total: 0,
        totalWord: '',
        accountName: '',
        accountNumber: '',
        ibanNumber: '',
        bankName: '',
        sortCode: '',
        currency: '',
      },
      descriptions: [
        {
          description: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
        },
      ],
    },
  });

  const fieldArray = useFieldArray({
    name: 'descriptions',
    control,
  });

  const fieldInvoiceArray = useFieldArray({
    name: 'invoiceValues',
    control,
  });

  const tableHead = ['S/N', 'Description', 'QTY', ' Unit Price (₦)', 'Total (₦)'];

  const tableData = [
    {
      Description: 'Consultancy service',
      QTY: '3',
      UnitPrice: '1,000,000.00',
      Total: '3,000,000.00',
    },
  ];

  useEffect(() => {
    fieldArray?.fields?.forEach((description, index) => {
      const qty = watch(`descriptions[${index}].quantity`);
      const unitPrice = watch(`descriptions[${index}].unitPrice`);

      setValue(`descriptions[${index}].totalPrice`, +qty * +unitPrice);

      setTotalAmount(+qty * +unitPrice);

      const vatPercentage = watch(`invoiceValues.vatPercentage`);

      const whtPercentage = watch(`invoiceValues.whtPercentage`);

      const prices = fieldArray?.fields?.map((description, index) => {
        return getValues(`descriptions[${index}].totalPrice`);
      });

      const subTotal = prices?.reduce((acc, cur) => acc + cur, 0);

      setValue(`invoiceValues.subTotal`, formatNumber(subTotal));

      const discountValue = watch(`invoiceValues.discountValue`);

      const discount = subTotal - (+discountValue / 100) * subTotal;

      setValue(`invoiceValues.discount`, formatNumber(discount));

      const vat = (+vatPercentage / 100) * discount;

      setValue(`invoiceValues.vat`, formatNumber(vat));

      const wht = (+whtPercentage / 100) * subTotal;

      setValue(`invoiceValues.wht`, formatNumber(wht));

      const total = discount + vat + wht;

      setValue(`invoiceValues.total`, formatNumber(total));
    });
  }, [fieldArray, watch, setValue]);

  useEffect(() => {
    dispatch(getAllProjects());
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
      <Helmet>Add New Invoice | Relia Energy</Helmet>

      <Wrapper>
        <DashboardHeader title={'Add New Invoice'} text={'Create new invoice and send for approval'} />

        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex', mb: '30px' }}
            onClick={() => {
              navigate('/dashboard/invoice');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <HeadCard>
          <Stack
            sx={{ width: '100%' }}
            component="form"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              console.log(data?.invoiceValues?.total?.replaceAll(',', ''));

              const params = {
                projectId: data?.invoiceValues?.projectId,
                billTo: data?.invoiceValues?.total?.replaceAll(',', ''),
                subject: data?.invoiceValues?.subject,
                vat: data?.invoiceValues?.vatPercentage,
                wht: data?.invoiceValues?.whtPercentage,
                discount: data?.invoiceValues?.discountValue,
                subTotal: data?.invoiceValues?.subTotal?.replaceAll(',', ''),
                total: data?.invoiceValues?.total?.replaceAll(',', ''),
                totalWord: data?.invoiceValues?.totalWord,
                accountName: data?.invoiceValues?.accountName,
                accountNumber: data?.invoiceValues?.accountNumber,
                ibanNumber: data?.invoiceValues?.ibanNumber,
                bankName: data?.invoiceValues?.bankName,
                sortCode: data?.invoiceValues?.sortCode,
                currency: data?.invoiceValues?.currency,
                createdBy: invoiceData?.createdBy,
                descriptions: data?.descriptions,
              };

              console.log(params);
              dispatch(createInvoices(params, setOpen, setError, setErrorMessage, setSuccessMessage));
            })}
          >
            <Typography variant="h4" sx={{ mb: '40px' }}>
              Client Invoice
            </Typography>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="last_name">
                    Subject<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter subject"
                    name={`invoiceValues.subject`}
                    type="text"
                    {...register(`invoiceValues.subject`)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="sent_to">
                    Project Name<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    name={`invoiceValues.projectId`}
                    type="text"
                    {...register(`invoiceValues.projectId`)}
                    // required
                  >
                    <option value="">Select Option</option>

                    {React.Children.toArray(
                      projects?.map((project) => <option value={project?._id}>{project?.projectName}</option>)
                    )}
                  </GeneralInput>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="sent_to">
                    Bill To<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    name={`invoiceValues.billTo`}
                    type="text"
                    {...register(`invoiceValues.billTo`)}
                    // required
                  >
                    <option value="">Select Option</option>

                    {React.Children.toArray(
                      projects?.map((project) => <option value={project?._id}>{project?.projectName}</option>)
                    )}
                  </GeneralInput>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="last_name">
                    Currency<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter currency"
                    name={`invoiceValues.currency`}
                    type="text"
                    {...register(`invoiceValues.currency`)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="last_name">
                    Sort Code<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter sort code"
                    name={`invoiceValues.sortCode`}
                    type="text"
                    {...register(`invoiceValues.sortCode`)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="last_name">
                    Iban Number<span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter iban Number"
                    name={`invoiceValues.ibanNumber`}
                    type="text"
                    {...register(`invoiceValues.ibanNumber`)}
                  />
                </Stack>
              </Grid>
            </Grid>

            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
              <TableContainer sx={{ maxHeight: 'height: 920px', width: '100%' }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {tableHead.map((td, key) => (
                        <TableCell
                          key={key}
                          style={{
                            minWidth: 50,
                            fontWeight: 800,
                            fontSize: '10px',
                            lineHeight: '16px',
                            color: '#515151',
                          }}
                        >
                          {td}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fieldArray?.fields?.map((field, index) => (
                      <Fragment key={field?.id}>
                        <TableRow>
                          <TableCell
                            style={{
                              minWidth: 30,
                              fontSize: '12px',
                            }}
                            component="th"
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            style={{
                              minWidth: 30,
                              fontSize: '12px',
                            }}
                          >
                            <VoucherInput
                              // ref={register}
                              name={`descriptions[${index}].description`}
                              type="text"
                              {...register(`descriptions[${index}].description`)}
                              // onChange={(e) => handleFormChange(e.target)}
                            />
                          </TableCell>
                          <TableCell
                            style={{
                              // minWidth: 30,
                              fontSize: '12px',
                              width: '50px',
                              padding: '0px',
                            }}
                          >
                            <VoucherInput
                              // ref={register}
                              sx={{
                                width: '100%',
                              }}
                              name={`descriptions[${index}].quantity`}
                              type="text"
                              {...register(`descriptions[${index}].quantity`)}
                              // onChange={(e) => handleFormChange(e.target)}
                            />
                          </TableCell>
                          <TableCell
                            style={{
                              // minWidth: 30,
                              fontSize: '12px',
                              width: '80px',
                              padding: '10px',
                            }}
                          >
                            <VoucherInput
                              // ref={register}
                              name={`descriptions[${index}].unitPrice`}
                              type="text"
                              {...register(`descriptions[${index}].unitPrice`)}
                              // onChange={(e) => handleFormChange(e.target)}
                            />
                          </TableCell>
                          <TableCell
                            style={{
                              minWidth: 30,
                              fontSize: '12px',
                              width: '100px',
                              padding: '0px',
                            }}
                          >
                            <VoucherInput
                              // ref={register}
                              name={`descriptions[${index}].totalPrice`}
                              type="text"
                              {...register(`descriptions[${index}].totalPrice`)}
                              // onChange={(e) => handleFormChange(e.target)}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button
                                style={{
                                  display: 'flex',
                                  gap: '20px',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '186px',
                                  height: '50px',
                                  border: '1px solid #D0D0D0',
                                  borderRadius: '11px',
                                  background: '#fff',
                                  cursor: 'pointer',
                                  fontSize: '15px',
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  fieldArray?.append();
                                }}
                              >
                                + <p>Add another row</p>
                              </button>
                              <button
                                style={{
                                  display: 'flex',
                                  gap: '20px',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '186px',
                                  height: '50px',
                                  border: '1px solid #D0D0D0',
                                  borderRadius: '11px',
                                  background: '#fff',
                                  cursor: 'pointer',
                                  fontSize: '15px',
                                }}
                                disabled={fieldArray?.fields?.length <= 1}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (fieldArray?.fields?.length > 1) fieldArray?.remove(index);
                                }}
                              >
                                -<p>Remove row</p>
                              </button>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))}

                    <TableRow>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '16px',
                          fontWeight: 800,

                          lineHeight: '24px',
                          color: '#272525',
                        }}
                      >
                        Sub-Total
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#272525',
                        }}
                      />

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                          }}
                          type="text"
                          onChange={(e) => handleFormChange(e.target)}
                          name={`invoiceValues.subTotal`}
                          {...register(`invoiceValues.subTotal`)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{}} />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '16px',
                          fontWeight: 400,

                          lineHeight: '24px',
                          color: '#272525',
                        }}
                      >
                        Discount
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#272525',
                        }}
                      />

                      <TableCell
                        style={{
                          // minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,
                          width: '50px',
                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                            borderBottom: '1px solid #A3A3A3',
                            width: '50px',
                          }}
                          // ref={register}
                          name={`invoiceValues.discountValue`}
                          {...register(`invoiceValues.discountValue`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                          }}
                          // ref={register}
                          name={`invoiceValues.discount`}
                          {...register(`invoiceValues.discount`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{}} />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '16px',
                          fontWeight: 400,

                          lineHeight: '24px',
                          color: '#272525',
                        }}
                      >
                        VAT
                      </TableCell>

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#272525',
                        }}
                      />

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,
                          width: '50px',
                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                            borderBottom: '1px solid #A3A3A3',
                            width: '50px',
                          }}
                          // ref={register}
                          name={`invoiceValues.vatPercentage`}
                          {...register(`invoiceValues.vatPercentage`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                          }}
                          // ref={register}
                          name={`invoiceValues.vat`}
                          {...register(`invoiceValues.vat`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{}} />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '16px',
                          fontWeight: 400,

                          lineHeight: '24px',
                          color: '#272525',
                        }}
                      >
                        WHT
                      </TableCell>

                      <TableCell style={{}} />

                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,
                          width: '50px',
                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                            borderBottom: '1px solid #A3A3A3',
                            width: '50px',
                          }}
                          // ref={register}
                          name={`invoiceValues.whtPercentage`}
                          {...register(`invoiceValues.whtPercentage`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                          }}
                          // ref={register}
                          name={`invoiceValues.wht`}
                          {...register(`invoiceValues.wht`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#272525',
                        }}
                      />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '16px',
                          fontWeight: 800,

                          lineHeight: '24px',
                          color: '#272525',
                        }}
                      >
                        Total
                      </TableCell>

                      <TableCell style={{}} />

                      <TableCell />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '14px',
                          fontWeight: 700,

                          lineHeight: '19px',
                          color: '#272525',
                        }}
                      >
                        <input
                          style={{
                            border: 'none',
                            outline: 'none',
                          }}
                          // ref={register}
                          name={`invoiceValues.total`}
                          {...register(`invoiceValues.total`)}
                          type="text"
                          // onChange={(e) => handleFormChange(e.target)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <p>Net amount in words: </p>
              <input
                style={{
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  borderBottom: '1px dashed #A3A3A3',
                  width: '80%',
                  outline: 'none',
                  padding: '0rem 0.5rem',
                }}
                // ref={register}
                name={`invoiceValues.totalWord`}
                {...register(`invoiceValues.totalWord`)}
                type="text"
                // onChange={(e) => handleFormChange(e.target)}
              />
            </Box>

            <Title>Beneficiary Payment Details</Title>

            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="accountName">Account name</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    name={`invoiceValues.accountName`}
                    {...register(`invoiceValues.accountName`)}
                    // onChange={(e) => handleFormChange(e.target)}
                    placeholder="Enter name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="accountNumber">Account number</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    name={`invoiceValues.accountNumber`}
                    {...register(`invoiceValues.accountNumber`)}
                    // onChange={(e) => handleFormChange(e.target)}
                    placeholder="Enter number"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="bankName">Bank name</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    name={`invoiceValues.bankName`}
                    {...register(`invoiceValues.bankName`)}
                    // onChange={(e) => handleFormChange(e.target)}
                    placeholder="Enter bank name"
                  />
                </Stack>
              </Grid>
            </Grid>

            <Button
              type="submit"
              // onClick={() => {
              //   setOpen(true);
              // }}
              // disabled={loading}
              sx={{ width: '31.5%', mt: '70px', outline: 'none' }}
            >
              {loading ? 'Loading...' : 'Send Invoice'}
            </Button>
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default AddInvoice;
