import axios from 'axios';
import React, {useEffect, useState} from 'react';
import MarksSummary from './MarksSummary';
import VisualData from './VisualMarks';
import VisualMarks from './VisualMarks';

const Marks = ({loggedInUser}) => {
    const [subjects,setSubjects] = useState([]);
    const [selectedSubjectId,setSelectedSubjectId] = useState(null);
    const [marksData,setMarksData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/fetchSubjects")
        .then((res)=>{
            setSubjects(res.data);
        })
        .catch((err)=> {
            console.error("error fetching subjects",err);
        })
    },[])


    const fetchStudentMarks = async(subjectId)=>{
      const res = await axios.get(`http://localhost:5000/studentMarks/${loggedInUser.id}/${subjectId}`);
      setMarksData(res.data);
    };
  return (
        <div className='mx-[1%] bg-gray-100 h-[98%] rounded-md '>
        <div className='border-2 border-gray-500  p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5 h-[10%]'>
          <div className='mr-1 font-outfit'>
          Test Scores - 
          </div>

          <div className='ml-2 font-outfit' >
            <select
          className="border rounded px-4 py-2"
          value={selectedSubjectId || ""}
          onChange={(e)=>{
           const subjectId = e.target.value;
           setSelectedSubjectId(subjectId);
           fetchStudentMarks(subjectId);
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
        <div className="flex  h-[87%] font-outfit">
             <div className=" w-[49%] gap-[1%] h-[100%] ">
               <MarksSummary  marksData={marksData}/>                        
             </div>
             <div className="border border-gray-900 mr-2 my-10"></div>
            <div className="h-[100%] w-[48%]  rounded-md mt-2">
              <VisualMarks marksData={marksData}/>
            </div>
        </div>

       }


      
         </div>
  )
}

export default Marks;
