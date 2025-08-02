import React, { useState } from 'react'
import Sidebar from "./Sidebar";
import MainContainer from './MainContainer';

const StudentDashboard = ({loggedInUser}) => {
  const [calendar,setCalendar] = useState(true);
  const [attendance,setAttendance] = useState(false);
  const [marks,setMarks] = useState(false);
  return (
    <div className='h-[100vh] [w-100vw] bg-[#eceaeb] flex justify-center items-center'>
      <Sidebar 
      loggedInUser={loggedInUser}
      setCalendar={setCalendar} 
      setAttendance={setAttendance}
      setMarks={setMarks}
      calendar={calendar}
      attendance={attendance}
      marks={marks}
      />

      <MainContainer 
      loggedInUser={loggedInUser}
      calendar={calendar}
      attendance={attendance}
      marks={marks}
      />
    </div>
  )
}

export default StudentDashboard;
