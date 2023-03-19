import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  TableCell,
  TableContainer,
  Stack,
  Grid,
  TextField,
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router';


import { useDispatch, useSelector } from 'react-redux';
import { TablePagination } from '../../../../utils/memoPaginationUtil';
import { Title, Action, VoucherInput} from '../../../../styles/main';
import { GetStaffName } from '../../../../utils/getValueById';
// import { getAllStaffs } from '../../../../redux/actions/StaffAction';

export const AllPaymentVoucher = ({ vouchers, setVoucherSheet, fields }) => {
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  const { staffs } = useSelector((state) => state?.staff);

  const tableHead = ['S/N', 'Subject', 'Date', 'Prepared By', 'Send To', 'Action'];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3 }}>
            <Title>All Payment Vouchers</Title>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  ' td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                <TableRow key={key} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 0 } }}>
                  <TableCell component="th" scope="row">
                    {(paginationPage - 1) * rowsPerPage + key + 1}
                  </TableCell>
                  <TableCell>{data?.subject}</TableCell>
                  <TableCell>{moment(data?.createdAt).format('L')}</TableCell>
                  <TableCell>{GetStaffName(data?.preparedBy, staffs)}</TableCell>
                  <TableCell>{GetStaffName(data?.recipientId, staffs)}</TableCell>
                  <TableCell>



                   {(data.recipientId===user.user.staffId || data.copies.includes(user.user.staffId)) &&(<Action
                          onClick={() => {
                            navigate(`/dashboard/update-voucher/${data?._id}`);
                          }}
                        >
                          View More
                        </Action>)}
                      {
                        data.preparedBy===user.user.staffId &&(
                           <Action
                          onClick={() => {
                            navigate(`/dashboard/update-voucher/${data?._id}`);
                          }}
                        >
                          Update Voucher
                        </Action>
                        )}
                        





                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack sx={{ my: 2 }}>
          <TablePagination
            paginationPage={paginationPage}
            total={vouchers.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </Stack>
      </Box>
    </>
  );
};

export const PaymentVoucher = ({ voucherData, register, fieldArray, handleFormChange }) => {
  const tableHead = [
    'S/N',
    'Class',
    'Desciption',
    'QTY',
    'Unit Price (₦)',
    'Amount (₦)',
    'VAT %',
    'VAT Amount (₦)',
    'Gross Amount (₦)',
    'WHT%',
    'WHT Amount',
    'Net Amount',
  ];

  // const handleFormChange = ({ name, value }) => {
  //   // setVoucherSheet(controlledFields);
  // };
  // console.log(voucherData[0]?.amount);
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3, width: '100%' }}>
            <Title>Payment Voucher</Title>
          </Box>

          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  'td,  th': {
                    borderBottom: '0.5px solid #D0D0D0',
                    fontWeight: 800,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#515151',
                    background: 'white',
                    py: 1,
                  },
                }}
              >
                {tableHead.map((td, key) => (
                  <TableCell key={key}>{td}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldArray?.fields?.map((field, index) => {
                console.log("");
                return (
                  <TableRow key={field?.id} sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].class`}
                        type="text"
                        {...register(`voucherSheet[${index}].class`)}
                       //  onChange={(e) => handleFormChange(e.target)}
                      />
                    </TableCell>
                    <TableCell>
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].description`}
                        type="text"
                        {...register(`voucherSheet[${index}].description`)}
                       // onChange={(e) => handleFormChange(e.target)}
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].qty`}
                        type="number"
                        {...register(`voucherSheet[${index}].qty`)}
                     //   onChange={(e) => handleFormChange(e.target)}
                        
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].unitPrice`}
                        type="number"
                        {...register(`voucherSheet[${index}].unitPrice`)}
                      //   onChange={(e) => handleFormChange(e.target)}
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].amount`}
                        type="number"
                        {...register(`voucherSheet[${index}].amount`)}
                      //   onChange={(e) => handleFormChange(e.target)}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].vat`}
                        // type="number"
                        {...register(`voucherSheet[${index}].vat`)}
                      //  onChange={(e) => handleFormChange(e.target)}
                      />
                    </TableCell>
                    <TableCell>
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].vatAmount`}
                        type="number"
                        {...register(`voucherSheet[${index}].vatAmount`)}
                    //     onChange={(e) => handleFormChange(e.target)}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].grossAmount`}
                        type="number"
                        {...register(`voucherSheet[${index}].grossAmount`)}
                   //      onChange={(e) => handleFormChange(e.target)}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].whtRate`}
                        // type="number"
                        {...register(`voucherSheet[${index}].whtRate`)}
                       //  onChange={(e) => handleFormChange(e.target)}
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].whtAmount`}
                        type="nuber"
                        {...register(`voucherSheet[${index}].whtAmount`)}
                     //    onChange={(e) => handleFormChange(e.target)}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {' '}
                      <VoucherInput
                        // ref={register}
                        name={`voucherSheet[${index}].netAmount`}
                        type="number"
                        {...register(`voucherSheet[${index}].netAmount`)}
                       // onChange={(e) => handleFormChange(e.target)}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
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

                   fieldArray.remove(index);
                    }}
                  >
                    -
                  </button>
                
                </TableCell>
                  </TableRow>
                );
              })}
              <TableRow sx={{ ' td,  th': { borderBottom: '0.5px solid #D0D0D0', py: 2 } }}>
                <TableCell component="th" scope="row" />
                <TableCell>
                  <h4>Total</h4>
                </TableCell>
                <TableCell />

                <TableCell />
                <TableCell />
                <TableCell>
                  {' '}
                  <VoucherInput
                    // ref={register}
                    disabled
                    sx={{
                      border: 'none !important',
                      outline: 'none !important',
                    }}
                    name={`voucherTotals.totalAmount`}
                    type="number"
                    {...register(`voucherTotals.totalAmount`)}
                  //   onChange={(e) => handleFormChange(e.target)}
                  />
                </TableCell>

                <TableCell />
                <TableCell>
                  {' '}
                  <VoucherInput
                    // ref={register}
                    disabled
                    sx={{
                      border: 'none !important',
                      outline: 'none !important',
                    }}
                    name={`voucherTotals.vatAmount`}
                    // type="number"
                    {...register(`voucherTotals.vatAmount`)}
                    // onChange={(e) => handleFormChange(e.target)}
                  />
                </TableCell>
                <TableCell>
                  <VoucherInput
                    // ref={register}
                    name={`voucherTotals.grossAmount`}
                    type="number"
                    {...register(`voucherTotals.grossAmount`)}
                    // onChange={(e) => handleFormChange(e.target)}
                    disabled
                    sx={{
                      border: 'none !important',
                      outline: 'none !important',
                    }}
                  />
                </TableCell>
                <TableCell />
                <TableCell>
                  {' '}
                  <VoucherInput
                    // ref={register}
                    name={`voucherTotals.whtAmount`}
                    // type="number"
                    {...register(`voucherTotals.whtAmount`)}
                    disabled
                    sx={{
                      border: 'none !important',
                      outline: 'none !important',
                    }}
                    // onChange={(e) => handleFormChange(e.target)}
                  />
                </TableCell>
                <TableCell>
                  {' '}
                  <VoucherInput
                    // ref={register}
                    name={`voucherTotals.netAmount`}
                    type="nuber"
                    {...register(`voucherTotals.netAmount`)}
                    // onChange={(e) => handleFormChange(e.target)}
                    disabled
                    sx={{
                      border: 'none !important',
                      outline: 'none !important',
                    }}
                  />
                </TableCell>
                
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', mt: '2rem' }}>
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
        {/* <button
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
            fieldArray?.remove();
          }}
        >
          - <p>Remove rows</p>
        </button> */}
      </Grid>
    </>
  );
};
