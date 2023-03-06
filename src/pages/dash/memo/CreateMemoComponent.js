import { useNavigate } from 'react-router';
// import { ArrowBackIos, ExpandMore } from '@mui/icons-material';
import {
  // IconButton,
  TextField,
  // tableCellClasses,
  Paper,
  // styled,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Box,
  Table,
  Typography,
  Button,
  Divider,
  Box,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TablePagination } from '../../../utils/memoPaginationUtil';
// import BackArrow from '../../../assets/images/memoBackArrow.png';
import '../../../components/memo/memo.css';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import { Wrapper, GeneralInput } from '../styles';
import Back from '../../../assets/images/arrow_left.svg';
import { getAllVoucher } from '../../../redux/actions/VoucherAction';

function CreateMemoComponent() {
  const { allVouchers, loading } = useSelector((state) => state.voucher);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  console.log(allVouchers);

  console.log(allVouchers.map((v) => v.voucherSheet.map((b) => b.class)));

  const [memoData, setMemoData] = useState({});

  const navigate = useNavigate();

  const handleCreateMemo = () => {};

  const dispatch = useDispatch();

  const tableHead = [
    'S/N',
    'Class',
    'Description',
    'QTY',
    'Unit Price (₦)',
    'Amount (₦)?',
    'VAT %',
    'VAT Amount (₦)',
    'Gross Amount (₦)',
    'WHT%',
    'WHT Amount',
    'Net Amount',
  ];

  const tableData = [
    {
      Class: 'Consultancy service',
      Description: 'FARS',
      QTY: '1',
      Price: '1,000,000.00',
      Amount: '1,000,000.00',
      VAT1: '7.50%',
      VAT2: '75,000.00',
      Gross: '1,075,000.00',
      WHT1: '2.5%',
      WHT2: '25,000.00',
      net: '1,050,000.00',
    },
    {
      Class: 'Consultancy service',
      Description: 'FARS',
      QTY: '1',
      Price: '1,000,000.00',
      Amount: '1,000,000.00',
      VAT1: '7.50%',
      VAT2: '75,000.00',
      Gross: '1,075,000.00',
      WHT1: '2.5%',
      WHT2: '25,000.00',
      net: '1,050,000.00',
    },
  ];

  useEffect(() => {
    dispatch(getAllVoucher());
  }, []);
  return (
    <>
      <Wrapper>
        <DashboardHeader
          title={'Memo'}
          icon={'eva:calendar-fill'}
          text={'Create and send memos to designated offices.'}
        />
        <Typography
          sx={{ color: 'primary.main', cursor: 'pointer', display: 'flex' }}
          onClick={() => {
            navigate('/dashboard/memo');
          }}
        >
          <img src={Back} alt="back" style={{ marginRight: '0.5rem' }} />
          Back
        </Typography>

        <div className="create-memo-wrapper" style={{ marginTop: '1rem' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>Create Memo</Typography>

          {/* <h4>Create Memo</h4> */}
          <div className="create-memo-form">
            <div className="create-memo-input-label">
              <span htmlFor="title">Memo title</span>
              <GeneralInput variant="outlined" />
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="Sent from">Sent from</span>
              <GeneralInput variant="outlined" />
            </div>

            <div className="create-memo-input-label">
              <span htmlFor="Sent to">Sent to</span>
              <GeneralInput
                select
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true,
                  // IconComponent: () => (
                  //   <ExpandMore className="create-memo-icon" />
                  // ),
                }}
              >
                <option value="">All memos</option>
                <option value=""> memos</option>
                <option value="">All </option>
              </GeneralInput>
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="CC 1">CC 1</span>
              <GeneralInput
                select
                variant="outlined"
                fullWidth
                SelectProps={{
                  native: true,
                  // IconComponent: () => (
                  //   <ExpandMore className="create-memo-icon" />
                  // ),
                }}
              >
                <option value="">All memos</option>
                <option value=""> memos</option>
                <option value="">All </option>
              </GeneralInput>
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="CC 2"> CC 2</span>
              <GeneralInput
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                  // IconComponent: () => (
                  //   <ExpandMore className="create-memo-icon" />
                  // ),
                }}
              >
                <option value="">All memos</option>
                <option value=""> memos</option>
                <option value="">All </option>
              </GeneralInput>
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="CC 3"> CC 3</span>
              <GeneralInput
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                  // IconComponent: () => (
                  //   <ExpandMore className="create-memo-icon" />
                  // ),
                }}
              >
                {' '}
                <option value="">All memos</option>
                <option value=""> memos</option>
                <option value="">All </option>
              </GeneralInput>
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="Date">Date</span>
              <GeneralInput InputLabelProps={{ shrink: true }} variant="outlined" fullWidth type="date" />
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="Memo subject"> Memo subject</span>
              <GeneralInput InputLabelProps={{ shrink: true }} variant="outlined" fullWidth type="date" />
            </div>

            <div className="create-memo-input-label">
              <span htmlFor="attachement?"> Add attachement?</span>
              <GeneralInput variant="outlined" fullWidth />
            </div>
            <div className="create-memo-input-label">
              <span htmlFor="Attachement type"> Attachement type</span>
              <GeneralInput
                variant="outlined"
                fullWidth
                select
                SelectProps={{
                  native: true,
                  // IconComponent: () => (
                  //   <ExpandMore className="create-memo-icon" />
                  // ),
                }}
              >
                <option value="">All memos</option>
                <option value=""> memos</option>
                <option value="">All </option>
              </GeneralInput>
            </div>
          </div>
        </div>

        <div className="payment-voucher-wrapper">
          <h4>Payment Voucher</h4>
          <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 0 }}>
            <TableContainer sx={{ maxHeight: 'height: 920px', width: '100%' }}>
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
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
                    {allVouchers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, key) => (
                      <TableRow key={key}>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                          component="th"
                          scope="row"
                        >
                          {key + 1}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.class}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.description}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.qty}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.unitPrice}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.amount}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.vat}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.vatAmount}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.grossAmount}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.whtRate}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.whtAmount}
                        </TableCell>
                        <TableCell
                          style={{
                            minWidth: 30,
                            fontSize: '12px',
                          }}
                        >
                          {data?.voucherSheet?.netAmount}
                        </TableCell>
                      </TableRow>
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
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        Total
                      </TableCell>

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
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        1,300,000.00
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        1,300,000.00
                      </TableCell>
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
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        112,300.00
                      </TableCell>
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
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      />
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        75,000.00
                      </TableCell>
                      <TableCell
                        style={{
                          minWidth: 30,
                          fontSize: '12px',
                          fontWeight: 800,

                          lineHeight: '16px',
                          color: '#515151',
                        }}
                      >
                        1,537,300.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Paper>
          <TablePagination
            paginationPage={paginationPage}
            total={tableData.length}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
          />

          <p>Net amount in words: ----------------------------------------------------------------------------------</p>

          <div className="memo-beneficiary-wrapper">
            <h4>Beneficiary Payment Details</h4>
            <div className="create-memo_beneficiary_form">
              <div className="create-memo-input-label">
                <span htmlFor="Account name">Account name</span>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter name" />
              </div>
              <div className="create-memo-input-label">
                <span htmlFor="Account number">Account number</span>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter number" />
              </div>
              <div className="create-memo-input-label">
                <span htmlFor="Bank name">Bank name</span>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter bank name" />
              </div>
            </div>
          </div>

          <div className="memo-activities_wrapper">
            <h4>Memo Activities</h4>
            <div className="create-memo_beneficiary_form">
              <div className="create-memo-input-label">
                <span htmlFor="Initiated by">Initiated by</span>
                <GeneralInput variant="outlined" fullWidth placeholder="Enter bank name" />
              </div>
              <div className="create-memo-input-label">
                <span htmlFor="Verified by">Verified by</span>
                <GeneralInput
                  select
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    native: true,
                    // IconComponent: () => (
                    //   <ExpandMore className="create-memo-icon" />
                    // ),
                  }}
                >
                  <option value="">Select option</option>
                  <option value=""> memos</option>
                  <option value="">All </option>
                </GeneralInput>
              </div>
              <div className="create-memo-input-label">
                <span htmlFor="Approved by">Approved by</span>
                <GeneralInput
                  select
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    native: true,
                    // IconComponent: () => (
                    //   <ExpandMore className="create-memo-icon" />
                    // ),
                  }}
                >
                  <option value="">Select option</option>
                  <option value=""> memos</option>
                  <option value="">All </option>
                </GeneralInput>
              </div>
            </div>
          </div>

          <div className="create-memo_signature">
            <div className="create-memo_verifier_signature">
              <Divider className="create-memo_divider" />
              <h4>Verifier Signature</h4>
            </div>
            <div className="create-memo_verifier_signature">
              <Divider className="create-memo_divider" />
              <h4>Authorizer Signature</h4>
            </div>
          </div>
        </div>

        <div className="create-memo_btn_wrapper">
          <Button variant="outline" className="create-memo_btn_btn_blue">
            Save and Send Memo
          </Button>
          <Button variant="outline" className="create-memo_btn_btn_white">
            Save Memo
          </Button>
        </div>
      </Wrapper>
    </>
  );
}

export default CreateMemoComponent;
