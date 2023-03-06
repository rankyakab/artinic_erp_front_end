import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { PDFDocument, PDFText, PDFTable, PDFTableRow, PDFTableColumn, PDFColumns, PDFColumn } from 'react-pdfmake';
import { useNavigate, useParams } from 'react-router';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard/DashboardLayout';
import Back from '../../../../assets/images/arrow_left.svg';
import ReliabuildInvoiceTemp from '../../../../assets/images/ReliabuildInvoiceTemp.png';
import Invoice from '../../../../assets/icons/Invoice.svg';
import DashboardHeader from '../../../../layouts/dashboard/DashboardHeader';
import {
  Button,
  GeneralInput,
  HeadCard,
  InputLabel,
  MemoDetailsParagraph,
  MemoDetailsSpan,
  ProcurementCard,
  Wrapper,
} from '../../../../styles/main';
import { capitalize } from '../../../../utils/formatNumber';

function ApprovalDetails() {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState({});

  const { allMemo, loading } = useSelector((state) => state.memo);

  console.log(allMemo);

  const { staffs } = useSelector((state) => state.staff);

  console.log(staffs);

  const getName = (id) => {
    const filterStaff = staffs?.filter((staff) => staff?._id === id);

    console.log(id);

    console.log(filterStaff);

    return (
      <p>
        {capitalize(filterStaff[0]?.firstName)} {capitalize(filterStaff[0]?.lastName)}
      </p>
    );
  };

  console.log(params);

  const memo = allMemo?.filter((item) => item?._id === params?.id);

  console.log(memo);

  const handleFormChange = ({ name, value }) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMemoAction = () => {};
  return (
    <>
      <Helmet>Client Invoice Details | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Client Invoice Details'} text={'View client’s invoice details'} icon={Invoice} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex', mt: '42px', mb: '32px' }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>
        <Grid item xs={12} md={12} sx={{ mb: '1rem' }}>
          <ProcurementCard
            sx={{
              height: 'auto',
              padding: '1rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Stack>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Description</Typography>

              <Typography sx={{ fontWeight: '800', fontSize: 28 }}>
                Invoice for the purchase of office stationaries
              </Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Request status</Typography>

              <Typography sx={{ fontWeight: '800', fontSize: 28, color: '#F29425' }}>Pending</Typography>
            </Stack>
          </ProcurementCard>
        </Grid>
        <HeadCard
          sx={{
            justifyContent: 'flex-start',
            gap: '10px',
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={4} sx={{ mb: '50px', gap: '30px' }}>
              <MemoDetailsParagraph variant="h5">
                Sent from: <MemoDetailsSpan>{moment(memo[0]?.createdAt).format('L')}</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <MemoDetailsParagraph variant="h5">
                Sent to: <MemoDetailsSpan> {getName(memo[0]?.ownerId)}</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <Stack sx={{ marginTop: '0px !important' }}>
                {React.Children.toArray(
                  [(1, 2, 3)].map((copy, index) => (
                    <Stack direction={'row'} alignItems="center">
                      <MemoDetailsParagraph>
                        {/* {`CC${index + 1}:`}  */}
                        CC
                      </MemoDetailsParagraph>
                      <MemoDetailsSpan>
                        {/* {getName(copy?.recipientId)} */}
                        Lukman Sadiq
                      </MemoDetailsSpan>
                    </Stack>
                  ))
                )}
              </Stack>
              <MemoDetailsParagraph>
                Request date:
                <MemoDetailsSpan>{memo[0]?.memoBody}</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <MemoDetailsParagraph>
                Attachment:
                <MemoDetailsSpan>{memo[0]?.attachment === '' ? 'No' : 'Yes'}</MemoDetailsSpan>
              </MemoDetailsParagraph>
            </Stack>
            <img
              src={ReliabuildInvoiceTemp}
              alt="invoice"
              style={{
                margin: '24px 0px 0px 0px',
              }}
            />
            <Stack direction={'row'} alignItems="center" spacing={4} width="100%">
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                Action:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px !important',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                >
                  Recommended for approval
                </span>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                By:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px !important',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                >
                  Fatimah Mohammed
                </span>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                  fontSize: '16px !important',
                  lineHeight: '22px',
                  color: '#272525',
                }}
              >
                Signature:{' '}
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#272525',
                  }}
                />
              </Typography>
            </Stack>
            <Grid container sx={{ mt: 4 }} component="form">
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="action">Action</InputLabel>
                  <GeneralInput
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    value={data?.action}
                    name="action"
                    onChange={(e) => handleFormChange(e.target)}
                  >
                    <option value="">Select action</option>
                    <option value="approve">Approve</option>
                    <option value="comment">Comment</option>
                    <option value="reject">Reject</option>
                  </GeneralInput>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="date">Remarks</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter remark"
                    value={data?.remarks}
                    name="remarks"
                    onChange={(e) => handleFormChange(e.target)}
                  />
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button sx={{ width: '100%', height: '55px' }}>
                  {loading ? <CircularProgress sx={{ width: '15px', color: '#fff' }} /> : ' Submit'}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default ApprovalDetails;
