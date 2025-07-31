import express from "express";
import multer from "multer";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "DigiTendence",
  password: "postee",
  port: 5432,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/uploadTeacherProfile", upload.single("image"), async (req, res) => {
  const { userId } = req.body;
  const imageBuffer = req.file.buffer;

  try {
    await pool.query("UPDATE teachers SET profile_pic = $1 WHERE id = $2", [
      imageBuffer,
      userId,
    ]);
    res.status(200).json({ message: "image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to upload image" });
  }
});

app.post("/uploadStudentProfile", upload.single("image"), async (req, res) => {
  const { userId } = req.body;
  const imageBuffer = req.file.buffer;

  try {
    await pool.query("UPDATE students SET profile_pic = $1 WHERE id = $2", [
      imageBuffer,
      userId,
    ]);
    res.status(200).json({ message: "image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to upload image" });
  }
});
app.post("/addStudent", async (req, res) => {
  const { name, bec, password } = req.body;
  if (!name || !bec || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const studentExists = await pool.query(
      "SELECT * FROM STUDENTS WHERE bec_number = $1",
      [bec]
    );
    if (studentExists.rows.length > 0) {
      return res.status(400).json({ error: "student registered already" });
    }
    const newStudent = await pool.query(
      "INSERT INTO STUDENTS(name,bec_number,password) VALUES($1,$2,$3) RETURNING *",
      [name, bec, password]
    );
    res
      .status(200)
      .json({ message: "Student registered", student: newStudent.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/logStudent", async (req, res) => {
  const { bec, password } = req.body;
  if (!bec || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM STUDENTS WHERE bec_number = $1 AND password = $2",
      [bec, password]
    );
    if (result.rows.length > 0) {
      const student = result.rows[0];
      res.json({ success: true, student });
    } else {
      res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, messsage: "Server error" });
  }
});

app.post("/addTeacher", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const teacherExists = await pool.query(
      "SELECT * FROM TEACHERS WHERE name = $1",
      [name]
    );
    if (teacherExists.rows.length > 0) {
      return res.status(400).json({ error: "Teacher registered already" });
    }

    const newTeacher = await pool.query(
      "INSERT INTO TEACHERS(name,email,password) VALUES($1,$2,$3) RETURNING *",
      [name, email, password]
    );
    res
      .status(200)
      .json({ message: "Teacher registered", teacher: newTeacher.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/logTeacher", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM TEACHERS WHERE name = $1 AND password = $2",
      [name, password]
    );
    if (result.rows.length > 0) {
      const teacher = result.rows[0];
      res.json({ success: true, teacher });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/fetchStudents", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.get("/getTeacherSubject/:userName", async (req, res) => {
  const { userName } = req.params;
  try {
    const result = await pool.query(
      "SELECT  s.id AS subject_id, s.name AS subject_name FROM teacher_subjects ts JOIN teachers t ON ts.teacher_id = t.id JOIN subjects s ON ts.subject_id = s.id WHERE t.name = $1",
      [userName]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subject" });
  }
});

app.get("/getTeacherProfile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      "SELECT profile_pic FROM teachers WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0 || !result.rows[0].profile_pic) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", "image/jpeg"); // or png
    res.send(result.rows[0].profile_pic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.get("/getStudentProfile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      "SELECT profile_pic FROM students WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0 || !result.rows[0].profile_pic) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", "image/jpeg"); // or png
    res.send(result.rows[0].profile_pic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.post("/submitAttendance", async (req, res) => {
  const attendanceList = req.body;
  try {
    for (const entry of attendanceList) {
      await pool.query(
        `INSERT INTO attendance (student_id, teacher_id, subject_id, date, status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (student_id, teacher_id, subject_id, date)
         DO UPDATE SET status = EXCLUDED.status`,
        [
          entry.student_id,
          entry.teacher_id,
          entry.subject_id,
          entry.date,
          entry.status,
        ]
      );
    }
    res.status(200).json({ message: "Attendance recorded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error saving attendance" });
  }
});

app.get("/getAttendance/:teacher_id/:subject_id/:date", async (req, res) => {
  const { teacher_id, subject_id, date } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM attendance WHERE teacher_id = $1 AND subject_id = $2 AND date = $3",
      [teacher_id, subject_id, date]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/submitExam", async (req, res) => {
  const { exam_name, total_marks, subject_id, teacher_id } = req.body;

  try {
    await pool.query(
      `INSERT INTO exams (exam_name, total_marks, subject_id, teacher_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [exam_name, total_marks, subject_id, teacher_id]
    );

    res.status(200).json({ message: "Exam recorded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving exam" });
  }
});

app.get("/getAllExams/:teacher_id/:subject_id", async (req, res) => {
  const { teacher_id, subject_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM exams WHERE teacher_id = $1 AND subject_id = $2 ",
      [teacher_id, subject_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
