import React, { useState } from 'react';
import StudentSignup from './Authentication/StudentSignup';
import StudentLogin from './Authentication/StudentLogin';
import TeacherSignup from './Authentication/TeacherSignup';
import TeacherLogin from './Authentication/TeacherLogin';

const LoginPage = () => {
    const [signup,setSignup] = useState(false);
    const [student,setStudent] = useState(false);
    const [login,setLogin] = useState(false);
    const [teacher,setTeacher] = useState(false);


  return (

    <div className="bg-[url('https://www.multcloud.com/resource/images/index/MC-home-banner-bg@2x.jpg')] bg-cover bg-center h-screen w-full flex justify-center items-center relative">
        <div className='bg-white absolute bg-opacity-55 rounded-xl h-[22rem] w-[30rem] flex flex-col justify-evenly'>
            <div className='flex flex-col justify-center items-center gap-5'>
            <div className='flex justify-center gap-5'>
            <button className='bg-white rounded-full text-[1.3rem] text-center font-medium px-3 py-1 hover:border-blue-900 hover:shadow-md hover:shadow-white' 
            onClick={()=> {
            setLogin(true)
            setSignup(false)
            }}>
              Login
              </button>

            <button className='bg-white rounded-full text-[1.3rem] text-center font-medium px-3 py-1 hover:border-blue-900 hover:shadow-md hover:shadow-white' 
            onClick={()=> {
            setSignup(true)
            setLogin(false)
            }}>
            Signup
            </button>
            </div>
            <div className='flex justify-center gap-5'>
            <div className='font-bold text-[1.2rem]'>
            <input type="radio"
            name="role"
            checked={student} 
            onClick={()=> {
            setStudent(true)
            setTeacher(false)
            }
            }/> Student
            </div>
            <div className='font-bold text-[1.2rem]'>
            <input type="radio" 
            name="role"
            checked={teacher}
            onClick={()=> {
            setTeacher(true) 
            setStudent(false)
            }}/> Teacher
            </div>
            </div>
            </div>
             
        {student && signup ? 
            <StudentSignup signup={signup}/>
        : null}

        {student && login ? 
            <StudentLogin signup={signup}/>
        : null}

        {teacher && signup ? 
           <TeacherSignup signup={signup} />
        : null}

        {teacher && login ? 
           <TeacherLogin signup={signup}/>
        : null}
        </div>
   </div>

  )
}

export default LoginPage;
