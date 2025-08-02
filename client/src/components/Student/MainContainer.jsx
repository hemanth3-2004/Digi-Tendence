import React from 'react';
import Calendar from "./Calender";
import Attendance from './Attendance';

const MainContainer = ({attendance,marks,calendar,loggedInUser}) => {
  return (
      <div className='MainContainer border-2  w-[80%] h-[96%] rounded-md bg-[#f9fafb]'>
        {calendar && <Calendar />}
        {attendance && <Attendance loggedInUser={loggedInUser}/>}
        {marks && <Calendar loggedInUser={loggedInUser}/>}
      </div>
  )
}

export default MainContainer;
