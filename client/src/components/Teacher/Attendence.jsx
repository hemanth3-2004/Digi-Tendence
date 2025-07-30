import React,{useState, useEffect} from 'react';
import dayjs from "dayjs";
import axios  from 'axios';

const Attendence = () => {
  const [attendance,setAttendance] = useState({});
  const [students,setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handlePrev = () => {
    setSelectedDate(prev => prev.subtract(1, 'day'));
  };

  const handleNext = () => {
    setSelectedDate(prev => prev.add(1, 'day'));
  }
useEffect(()=>{
      axios.get("http://localhost:5000/fetchStudents")
    .then(res=>{
      setStudents(res.data);
    })
    .catch(err=>{
      console.error("Error fetching students",err);
  });
});

  return (
        <div className='mx-[1%] bg-blue-50'>
        <div className='border-2 border-black  p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5'>ATTENDANCE</div>

       <div className="flex items-center justify-center mt-4 mb-4">
        <button 
          onClick={handlePrev} 
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 mr-4"
        >
          ⬅️ Prev Day
        </button>

        <div className="font-medium text-lg">
          {selectedDate.format("DD MMMM YYYY")}
        </div>

        <button 
          onClick={handleNext} 
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 ml-4"
        >
          Next Day ➡️
        </button>
      </div>


        <div className='  flex justify-evenly  rounded-md mb-0.5'>
          <div className='border-2 border-black w-[16%] text-center rounded-md'>Id</div>
          <div className='border-2 border-black w-[28%] text-center rounded-md'>Name</div>
          <div className='border-2 border-black w-[28%] text-center rounded-md flex gap-1 justify-center'> <p >Roll</p><p>Number</p></div>
          <div className='border-2 border-black w-[28%] text-center rounded-md'>Attendence</div>
        </div>
    
         {students.map((student,index)=>  <>
        <div className={`flex justify-evenly ${index%2 ==0 ? 'bg-white'  : 'bg-blue-200'}`}>
          <div className='border border-black w-[16%] py-1 text-center '>{student.id}</div>
          <div className='border border-black w-[28%] py-1 text-center'>{student.name}</div>
          <div className='border border-black w-[28%] py-1 text-center '>{student.bec_number}</div>
          <div className='border border-black w-[28%] py-1 text-center  flex justify-center items-center'>
           <button 
           className={`px-2 py-1 rounded ${attendance[student.id] ? "bg-green-400" : "bg-red-400"} text-white`}
           onClick={()=>{
            setAttendance({
              ...attendance,
              [student.id] : !attendance[student.id],
            })
           }}
           >
            {attendance[student.id] ? "Present" : "Absent"}
           </button>
          </div>
        </div>
          </>
        )}
    
    
    
         </div>
  )
}

export default Attendence;
