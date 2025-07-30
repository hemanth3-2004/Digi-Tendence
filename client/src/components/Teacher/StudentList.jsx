import axios from 'axios';
import React,{useState, useEffect} from 'react'
const StudentList = () => {
      const [students,setStudents] = useState([]);
  useEffect(()=> {
    axios.get("http://localhost:5000/fetchStudents")
    .then(res=>{
      setStudents(res.data);
    })
    .catch(err=>{
      console.error("Error fetching students",err);
  });
  });
  
  return (
        <div className='mx-[1%] bg-blue-200'>
        <div className='border-2 border-black  p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5'>STUDENTS LIST</div>
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
          <div className='border border-black w-[28%] py-1 text-center'><h2 className='hover:text-blue-500 cursor-pointer' >Attendence</h2></div>
        </div>
          </>
        )}
        </div>
  )
}

export default StudentList;
