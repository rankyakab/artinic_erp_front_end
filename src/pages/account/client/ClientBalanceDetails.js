import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import {
  Button,
  GeneralInput,
  HeadCard,
  InputLabel,
  MemoDetailsParagraph,
  MemoDetailsSpan,
  ProcurementCard,
  Wrapper,
} from '../../../styles/main';
import Back from '../../../assets/images/arrow_left.svg';

function ClientBalanceDetails() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title> Client Balance Details | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={`Client Balance`} text={`View client balance details`} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex', mt: '42px', mb: '32px' }}
            onClick={() => {
              navigate('/dashboard/client_balance');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>

        <Grid item xs={12} md={12}>
          <ProcurementCard
            sx={{ height: 'auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between' }}
          >
            <Stack>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Client name</Typography>

              <Typography sx={{ fontWeight: '800', fontSize: 28 }}>Ricky Rims Industries</Typography>
            </Stack>

            <Stack>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Balance amount</Typography>

              <Typography sx={{ fontWeight: '800', fontSize: 28 }}>₦500,000.00</Typography>
            </Stack>
          </ProcurementCard>
        </Grid>

        <HeadCard
          sx={{
            justifyContent: 'flex-start',
            gap: '20px',
            mt: '18px',
          }}
        >
          <Stack spacing={8}>
            <Stack spacing={6} sx={{ gap: '20px' }}>
              <MemoDetailsParagraph variant="h5">
                Project name: <MemoDetailsSpan>Purchasing of office equipment</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <MemoDetailsParagraph variant="h5">
                Client name: <MemoDetailsSpan> Ricky Rims Industries</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <MemoDetailsParagraph variant="h5">
                Project cost: <MemoDetailsSpan> ₦1,200,000.00</MemoDetailsSpan>
              </MemoDetailsParagraph>
              <MemoDetailsParagraph>
                Balance amount:
                <MemoDetailsSpan>₦500,000.00</MemoDetailsSpan>
              </MemoDetailsParagraph>
            </Stack>

            <Grid container sx={{ mt: 4 }} component="form">
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="action">Payment description</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter description"
                    // value={data?.remarks}
                    name="description"
                    // onChange={(e) => handleFormChange(e.target)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack>
                  <InputLabel id="date">Amount</InputLabel>
                  <GeneralInput
                    variant="outlined"
                    fullWidth
                    placeholder="Enter amount"
                    // value={data?.remarks}
                    name="amount"
                    // onChange={(e) => handleFormChange(e.target)}
                  />
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
                    // value={data?.action}
                    name="action"
                    // onChange={(e) => handleFormChange(e.target)}
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
                    // value={data?.remarks}
                    name="remarks"
                    // onChange={(e) => handleFormChange(e.target)}
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
                  Submit
                  {/* {loading ? <CircularProgress sx={{ width: '15px', color: '#fff' }} /> : ' Submit'} */}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default ClientBalanceDetails;
