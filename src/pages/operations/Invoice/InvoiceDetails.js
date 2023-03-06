import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument, PDFText, PDFTable, PDFTableRow, PDFTableColumn, PDFColumns, PDFColumn } from 'react-pdfmake';
import { useNavigate, useParams } from 'react-router';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { useDispatch, useSelector } from 'react-redux';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Box, Grid, Stack, Typography } from '@mui/material';
import DashboardLayout from '../../../layouts/dashboard/DashboardLayout';
import Back from '../../../assets/images/arrow_left.svg';
import ReliabuildInvoiceTemp from '../../../assets/images/ReliabuildInvoiceTemp.png';
import Invoice from '../../../assets/icons/Invoice.svg';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Button, Failed, GeneralInput, HeadCard, InputLabel, Pending, Success, Wrapper } from '../../../styles/main';
import { capitalize } from '../../../utils/formatNumber';
import { updateInvoices } from '../../../redux/actions/InvoiceAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';
// import { PDFFile } from '../../../utils/pdfBuilder';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function InvoiceDetails() {
  const [numPages, setNumPages] = useState(1);
  const [scale, setScale] = useState(1);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [data, setData] = useState({
    status: '',
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { invoices, loading } = useSelector((state) => state.invoice);

  const params = useParams();

  const dispatch = useDispatch();

  const filterInvoice = () => {
    const result = invoices?.filter((invoice) => invoice?._id === params?.id);

    setSingleInvoice(result);
    return result;
  };

  console.log(singleInvoice);

  const navigate = useNavigate();

  const handleFormChange = ({ name, value }) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = { ...singleInvoice[0], status: data?.status };
    console.log(params);
    dispatch(updateInvoices(params, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  useEffect(() => {
    filterInvoice();
  }, []);

  console.log(singleInvoice[0]);

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
      <Helmet>Client Invoice Details | Relia Energy</Helmet>
      <Wrapper>
        <DashboardHeader title={'Client Invoice Details'} text={'View client’s invoice details'} icon={Invoice} />
        <Stack>
          <Typography
            sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex', mt: '42px', mb: '32px' }}
            onClick={() => {
              navigate('/dashboard/invoice');
            }}
          >
            <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
            Back
          </Typography>
        </Stack>
        <HeadCard
          sx={{
            justifyContent: 'flex-start',
            gap: '170px',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="p">Invoice name</Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: '20px',
                lineHeight: '27px',
              }}
            >
              {capitalize(singleInvoice[0]?.subject)}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="p">Invoice status</Typography>
            {singleInvoice[0]?.status?.toLowerCase() === 'pending' ? (
              <Pending sx={{ fontWeight: '800', fontSize: '20px' }}>{capitalize(singleInvoice[0]?.status)}</Pending>
            ) : singleInvoice[0]?.status?.toLowerCase() === 'approve' ? (
              <Success sx={{ fontWeight: '800', fontSize: '20px' }}>{capitalize(singleInvoice[0]?.status)}</Success>
            ) : (
              <Failed sx={{ fontWeight: '800', fontSize: '20px' }}> {capitalize(singleInvoice[0]?.status)}</Failed>
            )}
          </Stack>
        </HeadCard>

        <HeadCard sx={{ mt: '16px' }}>
          <Stack width={'100%'} component="form" onSubmit={handleSubmit}>
            {/* <img
              src={ReliabuildInvoiceTemp}
              alt="invoice"
              style={{
                margin: '24px 0px 0px 0px',
              }}
            /> */}
            <Grid container xs={12} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <InputLabel id="action">Action</InputLabel>
                  <GeneralInput
                    select
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    value={data?.status}
                    name="status"
                    onChange={(e) => handleFormChange(e.target)}
                  >
                    <option value="">Select action</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="pending">Pending</option>
                  </GeneralInput>
                </Stack>
              </Grid>
              {/* <Grid item xs={12} md={6}>
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
              </Grid> */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button sx={{ width: '100%', height: '55px' }} type="submit">
                  {loading ? 'Loading...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </HeadCard>
      </Wrapper>
    </>
  );
}

export default InvoiceDetails;
