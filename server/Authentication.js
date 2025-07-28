import express from "express";
import cors from "cors";
import pkg from "pg";
 
const {Pool} = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "DigiTendence",
    password : "postee",
    port : 5432
})

app.post("/addStudent", async(req,res)=> {
    const {name,bec,password} = req.body;
    if (!name || !bec || !password) {
  return res.status(400).json({ error: "All fields are required" });
}

    try{
        const newStudent = await pool.query("INSERT INTO STUDENTS(name,bec_number,password) VALUES($1,$2,$3) RETURNING *",[name,bec,password]);
        res.status(200).json({message: "Student registered", student: newStudent.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
})

app.post('/addTeacher', async(req,res)=> {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error : "All fields are required"});
    }

    try{
        const newTeacher = await pool.query("INSERT INTO TEACHERS(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,password]);
        res.status(200).json({message: "Teacher registered",teacher : newTeacher.rows[0]});
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Server error"});
    }
})

app.listen(5000,()=> {
    console.log("Server running on http://localhost:5000");
})