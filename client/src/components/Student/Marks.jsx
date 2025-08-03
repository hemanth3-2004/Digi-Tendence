import axios from 'axios';
import React, {useEffect, useState} from 'react';

const Marks = () => {
    const [subjects,setSubjects] = useState([]);
    const [selectedSubjectId,setSelectedSubjectId] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:5000/fetchSubjects")
        .then((res)=>{
            setSubjects(res.data);
        })
        .catch((err)=> {
            console.error("error fetching subjects",err);
        })
    },[])
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


      
         </div>
  )
}

export default Marks;
