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



// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://arjun:arjun@cluster0.ip4i9rt.mongodb.net/employees?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Database is connected');
})
.catch(()=>{
    console.log('Unable to connect to Database');
})

const employeeSchema = new mongoose.Schema({
    name: String,
    location: String,
    position: String,
    salary: Number
  });
  const empData = mongoose.model('employee', employeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
router.get('/employeelist', async (req, res) => {
    try {
        const data = await empData.find();
        res.status(200).send(data);
    } catch (error) {
      res.status(404).send('Data not found');
    }
  });
 


//TODO: get single data from db  using api '/api/employeelist/:id'
router.get('/employeelist/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await empData.findById(id);
      if (employee) {
        res.status(200).send(employee);
      } else {
        res.status(404).send('Employee with this Id does not exist');
      }
    } catch (error) {
      res.status(404).send('Data not found');
    }
  });

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
router.post('/employeelist', async (req, res) => {
    try {
        const newEmployee = new empData(req.body);
        await newEmployee.save();
        res.status(201).send('Employee added successfully');
      } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).send('Server Error');
      }
  });

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
router.delete('/employeelist/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEmployee = await empData.findByIdAndDelete(id);
      if (deletedEmployee) {
        res.status(200).send('Employee deleted successfully');
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Server Error');
    }
  });

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
router.put('/employeelist', async (req, res) => {
    try {
      const { _id, name, location, position, salary } = req.body;
      const updatedEmployee = await empData.findByIdAndUpdate(
        _id,
        { name, location, position, salary },
        { new: true }
      );
      if (updatedEmployee) {
        res.status(200).send('Employee updated successfully');
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Server Error');
    }
  });



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    return console.error(`Failed to start server: ${err.message}`);
  }
  console.log(`Server is listening on Port ${port}`);
});


