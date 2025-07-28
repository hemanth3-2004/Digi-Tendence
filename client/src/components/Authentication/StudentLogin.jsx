import React from 'react'

const StudentLogin = ({signup}) => {
  return (
     <div className='border-2 rounded-lg h-[65%] mx-3 '>
         <form className="flex flex-col gap-3 justify items-center items-center my-4" action="">
         <div><input className='focus:outline-blue-800 rounded-md h-[2.5rem] w-[20rem] pl-4' type="text" name="bec" placeholder='BEC Number'required/></div>
         <div><input className='focus:outline-blue-800 rounded-md h-[2.5rem] w-[20rem] pl-4' type="password" name="password" placeholder='Password' required/></div>
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

export default StudentLogin;
