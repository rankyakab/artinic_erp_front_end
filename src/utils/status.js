import React from 'react';
import { FaCheckCircle, FaExclamationCircle,FaEnvelope,FaBuffer } from 'react-icons/fa';

function StatusIcon({ status }) {
  if (status === 'approved') {
    return (<stack>{status}<FaCheckCircle color="green" size="1.5em" /></stack>);
  } if (status === 'reject') {
    return (<stack>{status}<FaExclamationCircle color="red" size="1.5em" /></stack>);
  } 
   if (status === 'comment') {
    return(<stack>
        {status}
     <FaEnvelope color="yellow" size="1.5em" />
    </stack>);
  } 
   if (status === 'pending approval') {
    return (<stack>
        {status}<FaBuffer color="yellow" size="1.5em" /></stack>);
  } 
  return  (<stack>{status}<FaBuffer color="yellow" size="1.5em" /></stack>);
  

  }


export default StatusIcon;