// Task1: initiate app and run server at 3000z

const express=require('express');
const app=new express()
const router = express.Router();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', router);

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    return console.error(`Failed to start server: ${err.message}`);
  }
  console.log(`Server is listening on Port ${port}`);
});

// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://arjun:arjun@cluster0.ip4i9rt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('DB is connected');
})
.catch(()=>{
    console.log('Error in connection');
})

const employeeSchema = new mongoose.Schema({
    Name: String,
    Location: String,
    Position: String,
    Salary: Number
  });
  const empData = mongoose.model('employee', employeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'




//TODO: get single data from db  using api '/api/employeelist/:id'





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



