import React from 'react';
import StudentList from './StudentList';
import Attendence from './Attendence';
const MainContainer = ({studentList,attendance,marks}) => {

  return (
      <div className='MainContainer border-2  w-[80%] h-[96%] rounded-md bg-[#f9fafb] overflow-scroll'>
        {studentList && <StudentList />}
        {attendance && <Attendence />}
        {marks && <StudentList />}
      
      </div>

  )
}

export default MainContainer;


 