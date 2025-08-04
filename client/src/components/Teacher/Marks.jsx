import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

const Marks = ({ subject, loggedInUser }) => {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [testCreated, setTestCreated] = useState(false);
  const [examType, setExamType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [newExam, setNewExam] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedScore, setSelectedScore] = useState(null);
  const [showMarks, setShowMarks] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState(null);

  // Fetch students
  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchStudents")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students", err);
      });
  }, []);

  // Fetch all exams for this teacher + subject
  const fetchExams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getAllExams/${loggedInUser.id}/${subject.subject_id}`
      );
      setNewExam(res.data);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  useEffect(() => {
    if (loggedInUser && subject?.subject_id) {
      fetchExams();
    }
  }, [loggedInUser, subject]);

  // Fetch marks for selected exam
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const results = await Promise.all(
          students.map((student) =>
            axios.get(
              `http://localhost:5000/getAllMarks/${student.id}/${selectedExamId}`
            )
          )
        );
        const allMarks = results.map((res) => res.data[0]);
        setShowMarks(allMarks);
      } catch (err) {
        console.error("Error fetching Marks", err);
        setShowMarks([]); // Clear if failed or empty
      }
    };

      fetchMarks();
  }, [selectedExamId, students]);

  // Create a new exam
  const submitExam = async (examName, total) => {
    const ExamData = {
      teacher_id: loggedInUser.id,
      subject_id: subject.subject_id,
      exam_name: examName,
      total_marks: total,
    };

    try {
      await axios.post("http://localhost:5000/submitExam", ExamData);
      alert("Exam Created!");
      setTestCreated(false);
      setExamType("");
      setTotalMarks("");
      fetchExams(); // Refresh exams list
    } catch (err) {
      console.error("Error submitting exam", err);
    }
  };

  // Submit marks
  const submitMarks = async () => {
    const marksData = students.map((student) => ({
      exam_id: selectedExamId,
      student_id: student.id,
      marks_obtained:
        marks[student.id]?.[selectedExamId]?.marks_obtained || 0,
    }));

    try {
      await axios.post("http://localhost:5000/submitMarks", marksData);
      alert("Marks submitted!");
     
        const results = await Promise.all(
          students.map((student) =>
            axios.get(
              `http://localhost:5000/getAllMarks/${student.id}/${selectedExamId}`
            )
          )
        );
        const allMarks = results.map((res) => res.data[0]);
        setShowMarks(allMarks);
        setMarks({});
    } catch (err) {
      console.error("Error submitting marks", err);
    }
  };

  return (
    <div className="mx-[1%] bg-blue-50">
      <div className="border-2 border-black p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5">
        {subject.subject_name} - TEST SCORES
      </div>

      {/* Add Test Button */}
      <div className="p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5">
        <button
          className="p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5 bg-blue-400 text-white hover:bg-blue-300"
          onClick={() => setTestCreated(true)}
        >
          <h2 className="text-[1.6rem]">
            <IoMdAdd />
          </h2>
          ADD TEST
        </button>
      </div>

      {/* Test Creation Form */}
      {testCreated && (
        <div className="p-4 bg-gray-100 rounded shadow-md w-full max-w-md mx-auto mt-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Add New Test
          </h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Exam/Test Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2"
              placeholder="e.g., Midterm, Quiz 1"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Total Marks</label>
            <input
              type="number"
              className="w-full border px-3 py-2"
              placeholder="e.g., 50, 100"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => {
              if (examType && totalMarks) {
                submitExam(examType, totalMarks);
              } else {
                alert("Please fill in both fields");
              }
            }}
          >
            Create Test
          </button>
        </div>
      )}

      {/* List of Tests */}
      <ul className="space-y-2 pb-1">
        <div className="flex text-[1.2rem] flex-wrap gap-2">
          {newExam.map((exam) => (
            <li
              key={exam.exam_id}
              onClick={() => {
                setSelectedExamId(Number(exam.exam_id));
                setSelectedExam(exam.exam_name);
                setSelectedScore(exam.total_marks);
                setMarks({}); // Reset mark input
              }}
              className={`flex flex-col justify-between items-center border pb-1 cursor-pointer px-2 py-1 rounded w-auto ${
                selectedExam === exam.exam_name
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="font-medium text-blue-700">
                {exam.exam_name}
              </span>
              <span className="text-gray-600">Max: {exam.total_marks}</span>
            </li>
          ))}
        </div>
      </ul>

      {/* Marks Entry Section */}
      {selectedExamId && (
        <div>
          <div className="flex justify-evenly rounded-md mb-0.5 font-semibold">
            <div className="border-2 border-black w-[16%] text-center rounded-md">
              Id
            </div>
            <div className="border-2 border-black w-[28%] text-center rounded-md">
              Name
            </div>
            <div className="border-2 border-black w-[28%] text-center rounded-md">
              Roll Number
            </div>
            <div className="border-2 border-black w-[28%] text-center rounded-md">
              Marks
            </div>
          </div>

          {students.map((student, index) => {
            const existingMark = showMarks.find(
              (mark) =>
                mark?.student_id === student.id &&
                mark?.exam_id === selectedExamId
            );

            return (
              <div
                key={student.id}
                className={`flex justify-evenly ${
                  index % 2 === 0 ? "bg-white" : "bg-blue-200"
                }`}
              >
                <div className="border border-black w-[16%] py-1 text-center">
                  {student.id}
                </div>
                <div className="border border-black w-[28%] py-1 text-center">
                  {student.name}
                </div>
                <div className="border border-black w-[28%] py-1 text-center">
                  {student.bec_number}
                </div>
                <div className="border border-black w-[28%] py-2 text-center flex justify-center items-center">
                  {existingMark ? (
                    <span>{existingMark.marks_obtained}</span>
                  ) : (
                    <input
                      type="number"
                      className="w-[40%]  border rounded px-1 text-center bg-yellow-200"
                      placeholder="Marks"
                      value={
                        marks[student.id]?.[selectedExamId]?.marks_obtained ||
                        ""
                      }
                      onChange={(e) => {
                        const value = e.target.value;
                        setMarks((prev) => ({
                          ...prev,
                          [student.id]: {
                            ...prev[student.id],
                            [selectedExamId]: {
                              marks_obtained: value,
                            },
                          },
                        }));
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Submit Button */}
          {!showMarks.find(
            (mark) => mark?.exam_id === selectedExamId
          ) && (
            <div className="flex justify-center items-center text-[1.5rem] p-4 pb-6">
              <button
                className="px-2 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white"
                onClick={submitMarks}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marks;
