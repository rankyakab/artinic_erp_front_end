import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
// import HeaderCard from '../../../components/HeaderCard';
import { getAllRole } from '../../../redux/actions/RoleAction';
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import {  Wrapper } from '../../../styles/main';
import { getAllProcess } from '../../../redux/actions/ProcessAction';
import { getAllAction } from '../../../redux/actions/ActionsAction';
import { GetActionName } from '../../../utils/getValueById';
import { capitalize } from '../../../utils/formatNumber';
import { createPrivilege} from '../../../redux/actions/PrivilegeAction';
import SuccessCard from '../../../components/SuccessCard';
import ErrorCard from '../../../components/ErrorCard';

function Privileges() {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state?.role);
  const { processes } = useSelector((state) => state?.process);
  const { actions } = useSelector((state) => state?.action);
  const {  loading } = useSelector((state) => state?.role);

  // const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  // const [seleted, setSelected] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [selectedValue, setSelectedValue] = useState('');
  //   const [checkedActions, setCheckedActions] = useState('');
   const [selectedRole, setSelectedRole] = useState('');

  const [checkedActions, setCheckedActions] = useState({});

  
  const handleCheckboxChange = (e) => {
    const {selectedProcessId, selectedActionId} = JSON.parse(e.value);
    console.log({selectedProcessId, selectedActionId} );
    if(e.checked){
    
              const processExist = selectedRole.privilege.some(obj => obj.processId === selectedProcessId);
              let newPrev = [];
              if(processExist){
                    newPrev = selectedRole.privilege.map(element => {
                      if(element.processId===selectedProcessId){
                        return {processId:element.processId, action:[...element.action, selectedActionId] }
                      }
                      return element;
                    })
              }else{
                  newPrev  = [...selectedRole.privilege, {processId:selectedProcessId, action:[selectedActionId]} ]
              }

                setSelectedRole({...selectedRole, privilege:[...newPrev]})
                console.log("selected role if priviled is checked", selectedRole);
    }else {
                  const processExist = selectedRole.privilege.some(obj => obj.processId === selectedProcessId);
              let newPrev = [];
              if(processExist){
                    newPrev = selectedRole.privilege.map(element => {
                      if(element.processId===selectedProcessId){
                        return {processId:element.processId, action:[...element.action.filter(e => e!==selectedActionId)] }
                      }
                      return element;
                    })
              }

                setSelectedRole({...selectedRole, privilege:[...newPrev]})
                console.log("selected role if priviled is checked", selectedRole);
    }
    //  handleCheckboxChange(e, p, pro?._id);
    /*
    if (!checkedActions[processId]) setCheckedActions({ ...checkedActions, [processId]: [] });
    if (e.target.checked) {
      setCheckedActions((prev) => {
        return { ...prev, [processId]: [...prev[processId], action] };
      });
    } else {
      setCheckedActions((prev) => {
        return { ...prev, [processId]: checkedActions[processId].filter((a) => a !== action) };
      });
    }

    */
  };
/*
  const handleProcessClick = (processId) => {
    const privilege = processes.map((pro) => {
      if (pro?._id === processId) {
        return {
          processId: pro?._id,
          action: checkedActions[processId] ? checkedActions[processId] : [],
        };
      }
      return null;
    });
     console.log({ privilege });
  };

  */
/*
  const handleFormChange = ({ name, value }) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
*/
  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleClick = () => {
    handleClose();
  };

  const handleRoleChange = (value) => {
    // console.log(name);
   //  console.log("role",value);
   // console.log("role",JSON.parse(value));
   // console.log("on strngify",  JSON.stringify(value));
    setSelectedRole(JSON.parse(value));
    // console.log("role" , selectedRole);
  };

  const handleCreatePrivilege = (e) => {
    e.preventDefault();
    const privilege = Object.entries(checkedActions)?.map(([processId, actions], i) => {
      return {
        processId,
        actions,
      };
    });

    const data = {
      roleId: selectedValue,
      privilege,
    };

    dispatch(createPrivilege(data, setOpen, setError, setErrorMessage, setSuccessMessage));
  };

  const compilePrivilegesForRole = (role)=> {
     console.log("priv iteration",processes?.map((pro) => (
  {processId: pro._id, action: pro.action }
)))
    
  }

  useEffect(() => {
    dispatch(getAllRole());
    dispatch(getAllProcess());
    dispatch(getAllAction());
   // dispatch(getAllPrivilege());
  }, []);
useEffect(()=>{
// dispatch(getRolePrivilege(selectedRole));
// compilePrivilegesForRole(selectedRole);
 console.log("Your role previleges",selectedRole);
},[selectedRole]);


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
      />{' '}
      <Helmet>
        <title> Privileges |Relia Energy</title>
      </Helmet>
      <Wrapper>
        <DashboardHeader title={'Privileges'} text={'Create a new privileges'} />

        <Stack
          component={'form'}
          direction={'row'}
          spacing={4}
          justifyContent="space-between"
          onSubmit={handleCreatePrivilege}
        >
          <Stack sx={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px' }} width="30%">
            <h4
              style={{
                fontWeight: '800',
                fontSize: '20px',
                lineHeight: '27px',
              }}
            >
              Roles
            </h4>

            <Stack spacing={4}>
              {React.Children.toArray(
                roles?.map((role) => (
                  <Stack direction={'row'} alignItems="center" spacing={2} key={role?._id}>
                    <input
                      type="radio"
                      name="role"
                      value={JSON.stringify(role)}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    //  checked={selectedValue === role?._id}
                     // disabled={selectedValue !== '' && selectedValue !== role?._id}
                    />
                    <p>{capitalize(role?.role)} </p>
                  </Stack>
                ))
              )}
            </Stack>
          </Stack>

          <Stack sx={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px' }} width="70%">
            <h4
              style={{
                fontWeight: '800',
                fontSize: '20px',
                lineHeight: '27px',
              }}
            >
              Processes Privileges{' '}
            </h4>

            <Stack spacing={2}>
              {console.log("process",processes)}
              {React.Children.toArray(
                processes?.map((pro) => (
                  <Stack
                    onClick={() => {
                //      console.log({ processId: pro?._id, actions: checkedActions });
                    //  handleProcessClick(pro?._id);
                    }}
                    key = {pro?._id}
                  >
                    <p>{capitalize(pro?.process)}</p>
                    <Stack direction={'row'} alignItems="center" spacing={2}>
                      {React.Children.toArray(
                        pro?.action?.map((p) => (
                          <Stack direction={'row'} alignItems="center" key={pro.action?._id}>
                         
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              value={JSON.stringify({selectedProcessId:pro._id, selectedActionId :p})}
                              checked = {selectedRole.privilege.some(element => element.processId ===pro._id && element.action.includes(p) )}
                              onChange={(e) => {
                               // console.log("p", p)
                                //   handleProcessClick(pro?._id);
                                handleCheckboxChange(e.target);
                              }}
                            />
                            {GetActionName(p, actions)}
                            
                          </Stack>
                        )

                        )
                       

                      )}
                   
                    </Stack>
                  </Stack>
                ))
              )}
            </Stack>

            <button
              style={{
                width: '31.5%',
                height: '46px',
                marginTop: '3rem',
                borderRadius: '10px',
                border: '1px solid #14ADD6',
                background: '#fff',
                color: ' #14ADD6',
                cursor: 'pointer',
              }}
              type="submit"
            >
              {/* {loading ? 'Loading...' : 'Submit'} */}
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </Stack>
        </Stack>
      </Wrapper>
    </>
  );
}

export default Privileges;
