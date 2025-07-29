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
        const studentExists = await pool.query("SELECT * FROM STUDENTS WHERE bec_number = $1",[bec]);
        if(studentExists.rows.length>0){
            return res.status(400).json({error: "student registered already"});
        }
        const newStudent = await pool.query("INSERT INTO STUDENTS(name,bec_number,password) VALUES($1,$2,$3) RETURNING *",[name,bec,password]);
        res.status(200).json({message: "Student registered", student: newStudent.rows[0]});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
})

app.post('/logStudent', async(req,res)=> {
    const {bec,password} = req.body;
    if(!bec || !password){
        return res.status(400).json({error : "All fields are required"});
    }

    try{
        const result = await pool.query("SELECT * FROM STUDENTS WHERE bec_number = $1 AND password = $2",[bec,password]);
        if(result.rows.length>0){
            const student = result.rows[0];
            res.json({success: true,student});
        }else{
            res.json({sucess: false, message: "Invalid credentials"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, messsage: "Server error"});
    }
});

app.post('/addTeacher', async(req,res)=> {
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error : "All fields are required"});
    }

    try{
        const teacherExists = await pool.query("SELECT * FROM TEACHERS WHERE name = $1",[name]);
        if(teacherExists.rows.length>0){
            return res.status(400).json({error: "Teacher registered already"});
        }
    
        const newTeacher = await pool.query("INSERT INTO TEACHERS(name,email,password) VALUES($1,$2,$3) RETURNING *",[name,email,password]);
        res.status(200).json({message: "Teacher registered",teacher : newTeacher.rows[0]});
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Server error"});
    }
})


app.post("/logTeacher", async(req,res)=> {
    const {name,password} = req.body;

    if(!name || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    try{
        const result = await pool.query("SELECT * FROM TEACHERS WHERE name = $1 AND password = $2",[name,password]);
        if(result.rows.length>0){
          const teacher = result.rows[0];
          res.json({success: true, teacher});
        }else{
            res.json({success: false, message: "Invalid credentials"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"})
    }
})
app.listen(5000,()=> {
    console.log("Server running on http://localhost:5000");
})