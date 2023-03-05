import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// auth

// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';



//
import {
  Page404,
  Dashboard,

  LoginPage,
 
} from './elements';



// ----------------------------------------------------------------------

export default function Router() {
  const userRole = JSON.parse(localStorage.getItem('user'))?.user?.role;

  // const roles = JSON.parse(localStorage.getItem('roles'));\

  const { roles } = useSelector((state) => state.role);

  console.log(roles);

  const filterRoles = roles.filter((role) => userRole === role?._id);
  //  path : '/', element:<RequireAuth />,

  console.log(filterRoles);
  return useRoutes([
    {
      path : '/', element: <DashboardLayout /> ,
      children: [
                     {  path: '/dashboard',element: <Dashboard />, index:true },
          
                    
          
      ],
    },
    { path: 'login', element: <LoginPage/> },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
   
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}





