import axios from "axios";
import React, { useState, useEffect } from "react";
import AttendanceSummary from "./AttendanceSummary";
const StudentList = ({ subject, loggedInUser }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchStudents")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students", err);
      });
  });

  const fetchAttendanceData = async (studentId) => {
    const res = await axios.get(
      `http://localhost:5000/attendance/${studentId}/${subject.subject_id}/${loggedInUser.id}`
    );
    console.log(res.data);
    setAttendanceData(res.data);
  };

  return (
    <div className="mx-[1%] bg-blue-200">
      <div className="border-2 border-black  p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5">
        STUDENTS LIST
      </div>
      <div className="  flex justify-evenly  rounded-md mb-0.5">
        <div className="border-2 border-black w-[16%] text-center rounded-md">
          Id
        </div>
        <div className="border-2 border-black w-[28%] text-center rounded-md">
          Name
        </div>
        <div className="border-2 border-black w-[28%] text-center rounded-md flex gap-1 justify-center">
          {" "}
          <p>Roll</p>
          <p>Number</p>
        </div>
        <div className="border-2 border-black w-[28%] text-center rounded-md">
          Attendence
        </div>
      </div>

      {students.map((student, index) => (
        <>
          <div
            className={`flex justify-evenly ${
              index % 2 == 0 ? "bg-white" : "bg-blue-200"
            }`}
          >
            <div className="border border-black w-[16%] py-1 text-center ">
              {student.id}
            </div>
            <div className="border border-black w-[28%] py-1 text-center">
              {student.name}
            </div>
            <div className="border border-black w-[28%] py-1 text-center ">
              {student.bec_number}
            </div>
            <div
              className="border border-black w-[28%] py-1 text-center relative z-10"
              onClick={() => {
                setSelectedStudent(student);
                fetchAttendanceData(student.id);
              }}
            >
              <h2 className="hover:text-blue-500 cursor-pointer">Attendence</h2>
            </div>
            {selectedStudent?.id === student.id && (
                <div className="absolute  top-0 left-0 w-[65%] h-[100vh] bg-white bg-opacity-95 z-50 r shadow-lg border-2  border-blue-200 rounded-ld p-4">
                  <div className="flex  justify-around">
                  <h2 className="text-lg text-center font-bold mb-2 ml-56">
                    Attendance Summary for {student.name} - {subject.subject_name}
                  </h2>
                  <button className="bg-red-500 text-lg text-white font-semibold px-3 py-1 rounded flex ml-60"
                  onClick={(e)=>{
                    e.stopPropagation();
                    setSelectedStudent(null);
                  }}
                  >Close</button>
                  </div>
                    <div className="flex ">
                        <div className=" w-[49%] gap-[1%] overflow-y-scroll scrollbar-hide">
                          <AttendanceSummary attendanceData={attendanceData} />                        
                      </div>
                      <div className="border border-gray-500"></div>
                      <div className=" h-[90vh] w-[49%]"></div>
                    </div>

                  
                </div>
              )}
          </div>
        </>
      ))}
    </div>
  );
};

export default StudentList;
