import React from 'react';
import Calendar from './Calendar';
import StudentList from './StudentList';
import Attendence from './Attendence';
import Marks from './Marks';
const MainContainer = ({studentList,attendance,marks,subject,loggedInUser,calendar}) => {

  return (
      <div className='MainContainer border-2  w-[80%] h-[96%] rounded-md bg-[#f9fafb] overflow-y-scroll scrollbar-hide'>
        {calendar && <Calendar subject={subject}/>}
        {studentList && <StudentList subject={subject} loggedInUser={loggedInUser}/>}
        {attendance && <Attendence subject={subject} loggedInUser={loggedInUser}/>}
        {marks && <Marks subject={subject} loggedInUser={loggedInUser}/>}
      
      </div>

  )
}

export default MainContainer;


 