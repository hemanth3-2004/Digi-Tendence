import React from 'react'

const AttendanceSummary = ({attendanceData}) => {
  console.log(attendanceData);
  return (
    <div className='h-[90vh]'>

      <h2 className='text-center pt-2'>Number of classes taken : {attendanceData.length}</h2>
      <div className="flex justify-center items-center  mt-1 mb-0.5">
      <div className="border-2 border-black py-1 text-center w-[47%] rounded-lg text-[1.1rem] bg-blue-200">Date</div>
      <div className="border-2 border-black py-1 text-center w-[47%] rounded-lg text-[1.1rem] bg-blue-200">Status</div>
      </div>
      
      {attendanceData.length>0 ? (
        attendanceData.map((record,index)=> (
      <div className="flex justify-center items-center">
        <div className={`w-[47%] border border-black text-[1.1rem] text-center ${index%2 == 0 ? "bg-white" : "bg-blue-200"}`}>
          {new Date(new Date(record.date).getTime()+86400000).toISOString().split("T")[0]}{" "}
        </div>
        <div className={`w-[47%] border border-black text-[1.1rem] text-center ${index%2 == 0 ? "bg-white" : "bg-blue-200"}`}>
          {record.status}
        </div>
      </div>
      ))
      ): (
        <h2>No attendance found.</h2>
      )}

    </div>
  )
}

export default AttendanceSummary
