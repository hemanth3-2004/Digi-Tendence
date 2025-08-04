import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const Attendence = ({ subject, loggedInUser }) => {
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showAttendance, setShowAttendance] = useState([]);
  const today = dayjs().startOf('day');
  const isFutureDate = selectedDate.isAfter(today, 'day');
  const formattedDate = selectedDate.format('YYYY-MM-DD');

  useEffect(() => {
    axios.get('http://localhost:5000/fetchStudents')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.error('Error fetching students', err);
      });
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/getAttendance/${loggedInUser.id}/${subject.subject_id}/${formattedDate}`
        );
        setShowAttendance(res.data);
      } catch (err) {
        console.error('Error fetching attendance', err);
        setShowAttendance([]); // No record found for the date
      }
    };

    fetchAttendance();
  }, [selectedDate, loggedInUser.id, subject.subject_id]);

  const handlePrev = () => {
    setSelectedDate(prev => prev.subtract(1, 'day'));
  };

  const handleNext = () => {
    setSelectedDate(prev => prev.add(1, 'day'));
  };

  const submitAttendance = async () => {
    const attendanceData = students.map(student => ({
      student_id: student.id,
      teacher_id: loggedInUser.id,
      subject_id: subject.subject_id,
      date: formattedDate,
      status: attendance[student.id] ? 'Present' : 'Absent',
    }));

    try {
      await axios.post('http://localhost:5000/submitAttendance', attendanceData);
      alert('Attendance submitted!');

      const res = await axios.get(
        `http://localhost:5000/getAttendance/${loggedInUser.id}/${subject.subject_id}/${formattedDate}`
      );
      setShowAttendance(res.data);
      setAttendance({});
    } catch (err) {
      console.error('Error submitting attendance', err);
    }
  };

  return (
    <div className="mx-[1%] bg-blue-50">
      <div className="border-2 border-black p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5">
        {subject.subject_name} - ATTENDANCE
      </div>

      <div className="flex items-center justify-center mt-4 mb-4">
        <button
          onClick={handlePrev}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 mr-4"
        >
          ⬅️ Prev Day
        </button>

        <div className="font-medium text-lg">
          {selectedDate.format('DD MMMM YYYY')}
        </div>

        <button
          onClick={handleNext}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 ml-4"
        >
          Next Day ➡️
        </button>
      </div>

      <div className="flex justify-evenly rounded-md mb-0.5 font-semibold">
        <div className="border-2 border-black w-[16%] text-center rounded-md">Id</div>
        <div className="border-2 border-black w-[28%] text-center rounded-md">Name</div>
        <div className="border-2 border-black w-[28%] text-center rounded-md">Roll Number</div>
        <div className="border-2 border-black w-[28%] text-center rounded-md">Attendance</div>
      </div>

      {showAttendance.length > 0 ? (
        students.map((student, index) => {
          const attendanceRecord = showAttendance.find(
            (a) => a.student_id === student.id
          );

          return (
            <div
              key={student.id}
              className={`flex justify-evenly ${index % 2 === 0 ? 'bg-white' : 'bg-blue-200'}`}
            >
              <div className="border border-black w-[16%] py-1 text-center">{student.id}</div>
              <div className="border border-black w-[28%] py-1 text-center">{student.name}</div>
              <div className="border border-black w-[28%] py-1 text-center">{student.bec_number}</div>
              <div className="border border-black w-[28%] py-1 text-center flex justify-center items-center">
                {attendanceRecord?.status || 'N/A'}
              </div>
            </div>
          );
        })
      ) : isFutureDate ? (
        <div className="text-center text-gray-500 mt-4">Cannot take attendance for future date.</div>
      ) : (
        <>
          {students.map((student, index) => (
            <div
              key={student.id}
              className={`flex justify-evenly ${index % 2 === 0 ? 'bg-white' : 'bg-blue-200'}`}
            >
              <div className="border border-black w-[16%] py-1 text-center">{student.id}</div>
              <div className="border border-black w-[28%] py-1 text-center">{student.name}</div>
              <div className="border border-black w-[28%] py-1 text-center">{student.bec_number}</div>
              <div className="border border-black w-[28%] py-1 text-center flex justify-center items-center">
                <button
                  className={`px-2 py-1 rounded ${
                    attendance[student.id] ? 'bg-green-400' : 'bg-red-400'
                  } text-white`}
                  onClick={() =>
                    setAttendance((prev) => ({
                      ...prev,
                      [student.id]: !prev[student.id],
                    }))
                  }
                >
                  {attendance[student.id] ? 'Present' : 'Absent'}
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center items-center text-[1.5rem] p-4 pb-6">
            <button
              className="px-2 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white"
              onClick={submitAttendance}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Attendence;
