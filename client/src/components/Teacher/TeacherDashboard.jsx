import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';

const TeacherDashboard = ({loggedInUser}) => {
    const [studentList,setStudentList] = useState(false);
    const [attendance,setAttendance] = useState(false);
    const [marks,setMarks] = useState(false);


  return (
    <div className='h-[100vh] [w-100vw] bg-[#eceaeb] flex justify-center items-center'>
      <Sidebar 
      loggedInUser={loggedInUser}
      setStudentList={setStudentList}
      setAttendance={setAttendance}
      setMarks={setMarks}
      />
      <MainContainer 
      studentList={studentList}
      attendance={attendance}
      marks={marks}/>
    </div>
  )
}

export default TeacherDashboard;
