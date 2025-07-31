    import axios from "axios";
    import { useEffect } from "react";
    import React, { useState } from "react";
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

    const submitMarks = async () => {
        const marksData = students.map((student) => ({
        student_id: student.id,
        teacher_id: loggedInUser.id,
        subject_id: subject.subject_id,
        exam: selectedExam,
        marks_obtained: marks[student.id]?.[selectedExam]?.marks_obtained || 0,
        total: selectedScore,
        }));

        try {
        await axios.post("http://localhost:5000/submitMarks", marksData);
        alert("Marks submitted!");

        const res = await axios.get(
            `http://localhost:5000/getExams/${loggedInUser.id}/${subject.subject_id}/${selectedExam}`
        );
        setNewExam(res.data);
        } catch (err) {
        console.error("Error submitting marks", err);
        }
    };

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

        const res = await axios.get(
            `http://localhost:5000/getExams/${loggedInUser.id}/${subject.subject_id}/${selectedExam}`
        );
        setNewExam(res.data);
        } catch (err) {
        console.error("Error submitting marks", err);
        }
    };

    useEffect(() => {
        const fetchExams = async () => {
        try {
            const res = await axios.get(
            `http://localhost:5000/getAllExams/${loggedInUser.id}/${subject.subject_id}`
            );
            setNewExam(res.data); // or whatever state holds your exams list
        } catch (err) {
            console.error("Error fetching exams:", err);
        }
        };

        if (loggedInUser && subject?.subject_id) {
        fetchExams();
        }
    }, [loggedInUser, subject]);

    useEffect(() => {
        const fetchMarks = async () => {
        try {
            const res = await axios.get(
            `http://localhost:5000/getAttendance/${loggedInUser.id}/${subject.subject_id}/${selectedExam}`
            );
            setShowMarks(res.data);
        } catch (err) {
            console.error("Error fetching Marks", err);
            setShowMarks([]); // No record found for the date
        }
        };

        fetchMarks();
    }, [selectedExam, loggedInUser.id, subject.subject_id]);

    return (
        <div className="mx-[1%] bg-blue-50">
        <div className="border-2 border-black p-3 mt-[.5%] flex justify-center items-center font-medium rounded-md mb-0.5">
            {subject.subject_name} - TEST SCORES
        </div>

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
                    const addExam = {
                    name: examType,
                    total: totalMarks,
                    };
                    setNewExam((prev) => [...prev, addExam]);
                    // Ensure this is set
                    submitExam(examType, totalMarks); // ✅ CALL submitExam
                    setTestCreated(false);
                } else {
                    alert("Please fill in both fields");
                }
                }}
            >
                Create Test
            </button>
            </div>
        )}

        <ul className="space-y-2  pb-1">
            <div className="flex text-[1.2rem]">
            {newExam.map((exam, index) => (
                <li
                key={index}
                onClick={() => {
                    setSelectedExam(exam.exam_name); // ✅ fixed
                    setSelectedScore(exam.total_marks); // ✅ fixed
                }}
                className={`flex flex-col justify-between items-center border-b pb-1 cursor-pointer px-2 py-1 rounded ${
                    selectedExam === exam.exam_name ? "bg-blue-100" : "hover:bg-gray-100"
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

        {newExam.map((exam) => {
            if (selectedExam === exam.exam_name) {
            return (
                <div>
                <div>{selectedExam}</div>
                <div>{selectedScore}</div>
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

                {showMarks.length > 0 ? (
                    students.map((student, index) => {
                    const marksRecord = showMarks.find(
                        (a) => a.student_id === student.id
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
                        <div className="border border-black w-[28%] py-1 text-center flex justify-center items-center">
                            {marksRecord?.marks_obtained || 0}
                        </div>
                        </div>
                    );
                    })
                ) : (
                    <>
                    {students.map((student, index) => (
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
                        <div className="border border-black w-[28%] py-1 text-center flex justify-center items-center">
                            <input
                            type="number"
                            className="border p-1 w-1/3 bg-yellow-200 text-center"
                            placeholder="Marks"
                            onChange={(e) =>
                                setMarks((prev) => ({
                                ...prev,
                                [student.id]: {
                                    ...prev[student.id],
                                    [selectedExam]: {
                                    marks_obtained: e.target.value,
                                    },
                                },
                                }))
                            }
                            />
                        </div>
                        </div>
                    ))}

                    <div className="flex justify-center items-center text-[1.5rem] p-4 pb-6">
                        <button
                        className="px-2 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white"
                        onClick={submitMarks}
                        >
                        Submit
                        </button>
                    </div>
                    </>
                )}
                </div>
            );
            }
            return null;
        })}
        </div>
    );
    };

    export default Marks;
