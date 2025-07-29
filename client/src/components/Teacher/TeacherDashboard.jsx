import React from 'react';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';

const TeacherDashboard = ({loggedInUser}) => {


  return (
    <div className='h-[100vh] [w-100vw] bg-[#eceaeb] flex justify-center items-center'>
      <Sidebar loggedInUser={loggedInUser}/>
      <MainContainer />
    </div>
  )
}

export default TeacherDashboard;
