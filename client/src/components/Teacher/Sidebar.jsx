import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { CiLogout } from "react-icons/ci";
axios
const Sidebar = (props) => {
    const [image,setImage] = useState(null);
    const userId = props.loggedInUser.id;
    const userName = props.loggedInUser.name;
    const [subject,setSubject] = useState({
        subject_id: '',
        subject_name: ''
    });
    props.setSubject(subject);
    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        if(file) setImage(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("image",file);
        formData.append("userId",userId);
   
        try{
            await axios.post("http://localhost:5000/uploadTeacherProfile",formData);
            alert("Profile uploaded!");
        }catch(err){
            console.error(err);
            alert("failed to upload profile");
        }
    };

      useEffect(() => {
    fetch(`http://localhost:5000/getTeacherProfile/${userId}`)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImage(url);
      });
  }, [userId]);

    useEffect(() => {
  axios.get(`http://localhost:5000/getTeacherSubject/${userName}`)
    .then(res => {
      console.log("Subject data:", res.data); 
      setSubject(res.data);
 
    })
    .catch(err => {
      console.error("Error fetching subject", err);
    });
}, [userName]);


  return (
      <div className='sidebar  border-2  w-[19%] h-[96%] mr-[.5%] rounded-md bg-[#f9fafb]'>
        <div className='border-2 border-red-500 h-[55%] rounded-md bg-gray-100'>
            <div className=' h-[50%] flex justify-center items-center'>
            <div className="bg-[url('https://vectorified.com/images/unknown-avatar-icon-7.jpg')] bg-cover bg-center  h-[10rem] w-[10rem] rounded-full border-blue-500 border-2">
            {image ? (<img className="rounded-full h-[100%] w-[100%]" src={image} alt="Profile" />) : (<img src="" alt="" />)}
            
            </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-1 '>
                <div className='text-[1.3rem] font-medium'><h2>{props.loggedInUser.name}</h2></div>
                <div className='text-[1.3rem] font-medium'><h2>{subject.subject_name}</h2></div>
                <div className='text-[1.2rem] font-medium'><h2>{props.loggedInUser.email}</h2></div>
                <div className='text-[1.3rem] font-medium text-white'>
                <button className='bg-red-500 px-2  rounded-md hover:shadow-lg hover:shadow-red-200 flex'
                onClick={()=> {
                    setTimeout(()=>{
                        window.location.reload();
                    },100);
                }}
                ><CiLogout className='mt-1 mr-1'/> <h2>Log out</h2></button></div>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg shadow transition duration-200">
                      Upload Photo
                      <input type="file" accept="image/*"  onChange={handleImageChange} className="hidden" />
                </label>
            </div>
        </div>
        <div className=' h-[45%] rounded-md bg-gray-100 '>
            <div className='flex flex-col gap-1  pt-2 justify-center items-center '><div className='text-[1.4rem] font-medium hover:bg-blue-200 cursor-pointer hover:text-blue-800 mt-2'
            onClick={()=>{
                props.setCalendar(true)
                props.setStudentList(false)
                props.setAttendance(false)
                props.setMarks(false)
            }}
            ><h2>Calender</h2></div>
            <div className='text-[1.4rem] font-medium hover:bg-blue-200 cursor-pointer hover:text-blue-800 mt-2'
            onClick={()=>{
                props.setCalendar(false)
                props.setStudentList(true)
                props.setAttendance(false)
                props.setMarks(false)
            }}
            ><h2>Students List</h2></div>

            <div className='text-[1.4rem] font-medium hover:bg-blue-200 cursor-pointer hover:text-blue-800'
            onClick={()=>{
                props.setCalendar(false)
                props.setStudentList(false)
                props.setAttendance(true)
                props.setMarks(false)
            }}          
            ><h2>Attendence</h2></div>

            <div className='text-[1.4rem] font-medium hover:bg-blue-200 cursor-pointer hover:text-blue-800'
            onClick={()=>{
                props.setCalendar(false)
                props.setStudentList(false)
                props.setAttendance(false)
                props.setMarks(true)
            }}
            ><h2>Marks</h2></div>
            </div>
        </div>
      </div>
  )
}

export default Sidebar;
