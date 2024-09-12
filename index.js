
 
const express = require('express');
const dotenv = require('dotenv');
// const Student = require('./models/User');
const connectdb = require('./db/db');
// const { default: User } = require('./models/User');
const User = require('./models/User');
const jwt=require("jsonwebtoken")

const { error } = require('console');
const bcrypt = require('bcrypt');
const authenticateJWT = require('./middlewares/jwtauthorizaton');

const secret_token=process.env.JWT_SECRET_KEY;
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

// Connect to MongoDB
connectdb();

// app.post('/Studentdetails', async (req, res) => {
//     try {
//         const { name, email, phonenumber,school,transport } = req.body;
//         const student = new Student({
//             name,
//             email,
//             phonenumber,
//             school,
//             transport

//         });
//         const result = await student.save();
//         res.status(201).json(result);
//     } catch (error) {
//         console.error('Error saving student:', error);
//         res.status(500).json({ error: 'Error saving student' });
//     }
// });

// app.get('/Student', async (req, res) => {
//     try {
//         const students = await Student.deleteMany({
//             // email:"saiuday@gmail.com"
//             school:"kvm"
//         },{school:"kvm"});
//         //   const collections = await mongoose.connection.db.listCollections().toArray();
//         // console.log("Collections:", collections.map(c => c.name));
       
//         console.log("Students fetched:", students);
//         res.status(200).json(students);
//     } catch (error) {
//         console.error('Error fetching students:', error);
//         res.status(500).json({ error: 'Error fetching students' });
//     }
// });

app.post("/signup",async(req,res)=>{
const {username,email,password}=req.body;

try{
    const userexists= await User.findOne({email});
    if(userexists){
        return res.send("user already exists")
        
    }else{
        const HashPass=await bcrypt.hash(password,10)
        const users=new User({
            username,
            email,password:HashPass
        })
        await users.save()
        res.send("user created successfully")
    }
}catch(error){
res.send(error)
}
})
       
app.post("/login",async(req,res)=>{
    const {username,password}=req.body

    try{
    const user= await User.findOne({username});
    if(!user){
res.send("user not found")
    }
    
    const passMatch=await bcrypt.compare(password,user.password);
    if(!passMatch){
        res.send("invalid password")
    }

      const token= jwt.sign({user},secret_token) ;
      console.log(token)
      res.send("login success")
    
}
catch(error){
res.send(error)
}})



app.get("/restricted",authenticateJWT,(req,res)=>{
    res.json({
        message: 'Protected endpoint',
        user: req.user
    });
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

