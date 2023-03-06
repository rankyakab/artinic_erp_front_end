import { styled } from '@mui/material/styles';
import { TextField, FormLabel } from '@mui/material';

// General Styles
export const Wrapper = styled('div')(() => ({
  padding: '0.5rem 2rem',
}));

export const Button = styled('button')(() => ({
  background: 'linear-gradient(135deg, #14ADD6 0%, #384295 100%)',
  borderRadius: '10px',
  border: 'none',
  padding: '1rem 3rem',
  color: 'white',
  cursor: 'pointer',
  transform: 'capitalized',
}));

export const OutlinedButton = styled('button')(() => ({
  borderRadius: '10px',
  border: '1px solid #384295',
  padding: '1rem 3rem',
  color: '#384295',
  cursor: 'pointer',
  transform: 'capitalized',
}));

export const Action = styled('p')(() => ({
  color: '#14ADD6',
  cursor: 'pointer',
}));

export const Success = styled('p')(() => ({
  color: '#10A242',
}));

export const Pending = styled('p')(() => ({
  color: '#F29425',
}));

export const Failed = styled('p')(() => ({
  color: '#ED3237',
}));

export const Status = styled('p')(() => ({
  color: '#10A242',
}));

export const Card = styled('div')(() => ({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  padding: '2rem 1.5rem',
  borderRadius: '20px',
}));

export const FormCard = styled('form')(() => ({
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '20px',
  marginTop: '2rem',
}));

export const InputLabel = styled(FormLabel)(() => ({
  width: '100%',
  color: 'black',
  paddingBottom: '0.5rem',
  fontSize: '14px',
}));

export const GeneralInput = styled(TextField)(() => ({
  border: '1px solid #d0d0d0 !important',
  borderRadius: '10px !important',
  width: '95%',
  marginBottom: '2rem',
}));

export const Title = styled('div')(() => ({
  fontWeight: 'bold',
  fontSize: '20px',
}));

export const HeadCard = styled('div')(() => ({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  borderRadius: '20px',
}));

export const tableArrow = styled('div')(() => ({
  fontSize: '12px',
}));

// Procurements Styles
export const ProcurementCard = styled('div')(() => ({
  background: 'white',
  borderRadius: '20px',
  padding: '1rem',
  height: '150px',
}));

// Selct
export const InvoiceSelect = styled('select')(() => ({
  border: 'none !important',
  outline: 'none !important',
  width: '64px',
  height: '20px',
}));

export const VoucherInput = styled('input')(() => ({
  border: '1px solid #d0d0d0 !important',
  borderRadius: '10px',
  height: '50px',
  width: '100%',
}));

export const MemoDetailsParagraph = styled('p')(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: '800',
  fontSize: '16px',
  lineHeight: '22px',
  color: '#272525',
  marginBlockStart: '0em !important',
  marginBlockEnd: '0em !important',
  marginTop: '0px !important',
}));

export const MemoDetailsSpan = styled('p')(() => ({
  marginLeft: '10px',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',
  color: '#272525',
  marginBlockStart: '0em !important',
  marginBlockEnd: '0em !important',
  marginTop: '0px !important',
}));
