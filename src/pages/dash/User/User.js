import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CircularProgress, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import DashboardHeader from '../../../layouts/dashboard/DashboardHeader';
import HeaderCard from '../../../components/HeaderCard';
import { Wrapper } from '../../../styles/main';
import { UserTable } from './common/UserTable';
import { getAllUser } from '../../../redux/actions/UserAction';
import SuccessCard from '../../../components/SuccessCard';
// ----------------------------------------------------------------------

export default function User() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(16);
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [search, setSearch] = useState([]);

  const [keyword, setKeyword] = useState('');

  const { users, loading } = useSelector((state) => state.user);

  // console.log(staffs);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    console.log(keyword);
    e.preventDefault();
    setSearch(
      users?.filter(
        (user) =>
          user?.email?.toLowerCase() === keyword.toLowerCase() 
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    const page = newPage - 1;
    setPaginationPage(newPage);
    setPage(page);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  return (
    <>
      <Helmet>
        <title> User | Relia Energy</title>
      </Helmet>

      <Wrapper>
        <DashboardHeader title={'All User'} text={'View, search for and Assign Role to User'} />

        <HeaderCard
          searchLabel={'Quick search a user'}
          totalNumber={users?.length}
          totalNumberLabel={'Total number of user'}
          filterLabel={'Filter user'}
          filterText={'All User'}
          
          handleSearch={handleSearch}
          keyword={keyword}
          setKeyword={setKeyword}
        />

        {/* table */}
        {loading ? (
          <Container sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Container>
        ) : (
          <UserTable
            users={users}
            paginationPage={paginationPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            page={page}
            search={search}
          />
        )}
      </Wrapper>
    </>
  );
}
