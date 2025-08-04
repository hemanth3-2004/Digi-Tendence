import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CiLogout } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";

const Sidebar = (props) => {
  const [image, setImage] = useState(null);
  const [subject, setSubject] = useState({
    subject_id: '',
    subject_name: ''
  });

  const userId = props.loggedInUser.id;
  const userName = props.loggedInUser.name;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", userId);

    try {
      await axios.post("http://localhost:5000/uploadTeacherProfile", formData);
      alert("Profile uploaded!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile");
    }
  };

  // Fetch profile image
  useEffect(() => {
    fetch(`http://localhost:5000/getTeacherProfile/${userId}`)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImage(url);
      });
  }, [userId]);

  // Fetch subject info
  useEffect(() => {
    axios.get(`http://localhost:5000/getTeacherSubject/${userName}`)
      .then(res => {
        setSubject(res.data);
        props.setSubject(res.data); // Correct place to set parent state
      })
      .catch(err => {
        console.error("Error fetching subject", err);
      });
  }, [userName]);

  return (
    <div className="sidebar w-[20%] h-[96%] mr-2 rounded-xl bg-[#f3f4f6] shadow-lg p-4 flex flex-col justify-between font-outfit">
      
      {/* Profile */}
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
        <div className="relative h-36 w-36 rounded-full overflow-hidden border-4 border-blue-500 mb-3">
          <img
            src={image || "https://vectorified.com/images/unknown-avatar-icon-7.jpg"}
            alt="Profile"
            className="h-full w-full object-cover"
            onError={(e) => e.target.src = "https://vectorified.com/images/unknown-avatar-icon-7.jpg"}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">{props.loggedInUser.name}</h2>
        <h2 className="text-sm text-gray-500">{props.loggedInUser.email}</h2>
        {subject.subject_name && (
          <h2 className="text-md mt-1 text-gray-600">Subject: {subject.subject_name}</h2>
        )}

        <label className="mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow transition">
          Upload Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <button
          className="mt-2 flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md shadow transition"
          onClick={() => setTimeout(() => window.location.reload(), 100)}
        >
          <CiLogout className="mr-2 text-lg" />
          Log out
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2">
        <NavItem
          label="Calendar"
          active={props.calendar}
          onClick={() => {
            props.setCalendar(true);
            props.setStudentList(false);
            props.setAttendance(false);
            props.setMarks(false);
          }}
        />
        <NavItem
          label="Students List"
          active={props.studentList}
          onClick={() => {
            props.setCalendar(false);
            props.setStudentList(true);
            props.setAttendance(false);
            props.setMarks(false);
          }}
        />
        <NavItem
          label="Attendance"
          active={props.attendance}
          onClick={() => {
            props.setCalendar(false);
            props.setStudentList(false);
            props.setAttendance(true);
            props.setMarks(false);
          }}
        />
        <NavItem
          label="Marks"
          active={props.marks}
          onClick={() => {
            props.setCalendar(false);
            props.setStudentList(false);
            props.setAttendance(false);
            props.setMarks(true);
          }}
        />
      </div>
    </div>
  );
};

const NavItem = ({ label, active, onClick }) => (
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
