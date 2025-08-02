import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import AttendanceSummary from './AttendanceSummary';
import VisualData from './VisualData';
const Attendance = ({loggedInUser}) => {
  const [subjects,setSubjects] = useState([]);
  const [selectedSubjectId,setSelectedSubjectId] = useState(null);
  const [attendanceData,setAttendanceData] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/fetchSubjects")
    .then((res)=> {
      setSubjects(res.data);
    })
    .catch((err)=> {
      console.error("Error fetching subjects",err);
    });
  },[])

    const fetchAttendanceData = async (subjectId) => {
    const res = await axios.get(
      `http://localhost:5000/studentAttendance/${loggedInUser.id}/${subjectId}`
    );
    console.log(res.data);
    setAttendanceData(res.data);
  };


  return (
        <div className='mx-[1%] bg-blue-50 h-[100%]'>
        <div className='border-2 border-black  p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5 h-[10%]'>
          <div className='mr-'>
          ATTENDANCE - 
          </div>

          <div className='ml-2'>
            <select
          className="border rounded px-4 py-2"
          value={selectedSubjectId || ""}
          onChange={(e)=>{
           const subjectId = e.target.value;
           setSelectedSubjectId(subjectId);
           fetchAttendanceData(subjectId);
          }}
            >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option  key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
          </div>
          </div>


       {selectedSubjectId && 
        <div className="flex overflow-y-scroll">
             <div className=" w-[49%] gap-[1%] overflow-y-scroll scrollbar-hide ">
               <AttendanceSummary attendanceData={attendanceData} />                        
             </div>
             <div className="border border-gray-900 mr-2"></div>
            <div className="h-[90vh] w-[48%]  rounded-md mt-2">
             <VisualData  attendanceData={attendanceData}/>
            </div>
        </div>

       }
      
         </div>
  )
}

export default Attendance;
