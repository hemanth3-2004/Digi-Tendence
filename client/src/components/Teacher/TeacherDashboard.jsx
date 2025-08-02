import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContainer from './MainContainer';

const TeacherDashboard = ({loggedInUser}) => {
    const [calendar,setCalendar] = useState(true);
    const [studentList,setStudentList] = useState(false);
    const [attendance,setAttendance] = useState(false);
    const [marks,setMarks] = useState(false);
    const [subject,setSubject] = useState({});


  return (
    <div className='h-[100vh] [w-100vw] bg-[#eceaeb] flex justify-center items-center'>
      <Sidebar 
      loggedInUser={loggedInUser}
      setCalendar={setCalendar}
      setStudentList={setStudentList}
      setAttendance={setAttendance}
      setMarks={setMarks}
      setSubject={setSubject}
      calendar={calendar}
      studentList={studentList}
      attendance={attendance}
      marks={marks}
      />
      <MainContainer 
      loggedInUser={loggedInUser}
      calendar={calendar}
      studentList={studentList}
      attendance={attendance}
      marks={marks}
      subject={subject}
      />
    </div>
  )
}

export default TeacherDashboard;
