import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const TeacherLogin = ({signup,setNewTeacher,onLoginSuccess}) => {
  const [formData,setFormData] = useState({
    name: "",
    password: ""
  })

  const handleChange = (e)=> {
    setFormData(prev=> ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async(e)=> {
    e.preventDefault();

    try{
      const res = await axios.post('http://localhost:5000/logTeacher',formData);
      if(res.data.success){
        const teacher = res.data.teacher;
        alert(`Welcome ${teacher.name}!`);
        onLoginSuccess(teacher);
        setNewTeacher(true);
      }else{
        alert("Invalid name or password ");
      }
    }catch(err){
      console.error(err);
      alert("Error logging teacher");
    }
  }
  return (
        <div className='border-2 rounded-lg h-[65%] mx-3 '>
            <form className="flex flex-col gap-3 justify items-center items-center my-4" onSubmit={handleSubmit}>
            <div>
            <input className='focus:outline-blue-800 rounded-md h-[2.5rem] w-[20rem] pl-4' 
            type="text" 
            name="name" 
            value={formData.name}
            placeholder='Name'
            onChange={handleChange}
            required/></div>

            <div>
            <input className='focus:outline-blue-800 rounded-md h-[2.5rem] w-[20rem] pl-4' 
            type="password" 
            name="password" 
            value={formData.password}
            placeholder='Password' 
            onChange={handleChange}
            required/></div>

            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              {signup ? "Signup" : "Login"}
            </button>
            </form>
           </div>
  )
}

export default TeacherLogin;
