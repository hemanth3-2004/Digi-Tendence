import React from 'react'

const MarksSummary = ({marksData}) => {
  return (
    <div className='overflow-y-auto scrollbar-hide h-[100%] font-outfit'>

      <h2 className='text-center pt-2'>Number of Exams : {marksData.length}</h2>
      <div className="flex justify-center items-center  mt-1 mb-0.5">
      <div className="border-2 border-black py-1 text-center w-[47%] rounded-lg text-[1.1rem] bg-blue-200">Exam</div>
      <div className="border-2 border-black py-1 text-center w-[47%] rounded-lg text-[1.1rem] bg-blue-200">Marks</div>
      </div>
      
      {marksData.length>0 ? (
        marksData.map((record,index)=> (
      <div className="flex justify-center items-center">
        <div className={`w-[47%] border border-black text-[1.1rem] text-center ${index%2 == 0 ? "bg-white" : "bg-blue-200"}`}>
          {record.exam_name}
          </div>
        <div className={`w-[47%] border border-black text-[1.1rem] text-center ${index%2 == 0 ? "bg-white" : "bg-blue-200"}`}>
          {record.marks_obtained}
        </div>
      </div>
      ))
      ): (
        <h2 className='text-center mt-2 font-bold'>No Exams found.</h2>
      )}

    </div>
  )
}

export default MarksSummary;
