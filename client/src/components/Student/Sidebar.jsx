import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CiLogout } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";

const Sidebar = (props) => {
  const [image, setImage] = useState(null);
  const userId = props.loggedInUser.id;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      await axios.post("http://localhost:5000/uploadStudentProfile", formData);
      alert("Profile uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getStudentProfile/${userId}`)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImage(url);
      });
  }, [userId]);

  return (
    <div className='sidebar w-[20%] h-[96%] mr-2 rounded-xl bg-[#f3f4f6] shadow-xl p-4 flex flex-col justify-between font-outfit'>
      
      {/* Profile Section */}
      <div className='bg-white rounded-xl shadow-md p-4 flex flex-col items-center'>
        <div className="relative h-[10rem] w-[10rem] rounded-full overflow-hidden shadow-md border-4 border-blue-500 mb-4">
          <img
            src={image || "https://vectorified.com/images/unknown-avatar-icon-7.jpg"}
            alt="Profile"
            className="h-full w-full object-cover"
            onError={(e) => e.target.src = "https://vectorified.com/images/unknown-avatar-icon-7.jpg"}
          />
        </div>

        <h2 className='text-xl font-semibold text-gray-800'>{props.loggedInUser.name}</h2>
        <h2 className='text-md font-medium text-gray-500 mb-4'>Roll No - {props.loggedInUser.bec_number}</h2>

        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200">
          Upload Photo
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        <button
          className="mt-3 flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow transition"
          onClick={() => setTimeout(() => window.location.reload(), 100)}
        >
          <CiLogout className='mr-2 text-xl' />
          Log out
        </button>
      </div>

      <div className='bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 items-start'>
        <NavItem
          active={props.calendar}
          label="Calendar"
          onClick={() => {
            props.setCalendar(true);
            props.setAttendance(false);
            props.setMarks(false);
          }}
        />
        <NavItem
          active={props.attendance}
          label="Attendance"
          onClick={() => {
            props.setCalendar(false);
            props.setAttendance(true);
            props.setMarks(false);
          }}
        />
        <NavItem
          active={props.marks}
          label="Marks"
          onClick={() => {
            props.setCalendar(false);
            props.setAttendance(false);
            props.setMarks(true);
          }}
        />
      </div>
    </div>
  );
};

const NavItem = ({ active, label, onClick }) => (
  <div
    onClick={onClick}
    className={`w-full flex items-center gap-2 text-lg font-medium cursor-pointer px-3 py-2 rounded-md 
      ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'} 
      transition-all duration-200`}
  >
    <GoDotFill className={`${active ? 'text-blue-500' : 'text-transparent'} text-sm`} />
    {label}
  </div>
);

export default Sidebar;
