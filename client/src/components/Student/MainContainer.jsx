import React from 'react'
import Attendance from './Attendance'

const MainContainer = ({attendance,marks}) => {
  return (
      <div className='MainContainer border-2  w-[80%] h-[96%] rounded-md bg-[#f9fafb]'>
        {attendance && <Attendance />}
        {marks && <Attendance />}
      </div>
  )
}

export default MainContainer
