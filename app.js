const express = require('express');
const bodyParser = require('body-parser');
let {mongoose} = require('./mongoose/mongoose');
const {StudentModel} = require('./models/Students');


//define body parsers for form input
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.get('public');

//set up the port
const port = process.env.PORT || 8888;


//***Route to register a new student***
app.post('/register', (req, res) => {
  //get the input from the form body
  let surename = req.body.surename;
  let othernames = req.body.othernames;
  let faculty = req.body.faculty;
  let department = req.body.department;
  let level = req.body.level;

    //make an instance of the new studen DB model
    let newStudent = new StudentModel({
      surename,
      othernames,
      faculty,
      department,
      level
    });

    //Save the student details to the DB
    newStudent.save().then((doc) => {
      res.status(200).send(doc);
    }), (e) => {
      res.status(400).send(e);
    }
 });

//**Route to get all the students from the server*/
app.get('/allstudents', (req, res) => {
  StudentModel.find({}, (err, doc) => {
    if (err){
      return handleError(err);
    }
    res.send(doc);
  })
})

//**Route to get and edit a student's profile*/
app.put('/edit-student/:id', (req, res) => {
  let id = req.params.id; //get the Id of the student details from the url
  let surename = req.body.surename;
  let othernames = req.body.othernames;
  let faculty = req.body.faculty;
  let department = req.body.department;
  let level = req.body.level;

  StudentModel.findById({_id: id}).then((studentDetails) => {
      return Object.assign(studentDetails, {
        surename,
        othernames,
        faculty,
        department,
        level
      });
  }).then((updatedInfo) => {
      return updatedInfo.save();
  }).then((newDetails) => {
      res.send({
          msg: 'Profile Edited',
          student: newDetails
      });
  }).catch((err) => {
      res.send(err);
  });
});

//**Route to get and delete a student's profile*/
app.post('/delete-student/:id', (req, res) => {
  let id = req.params.id; //get the Id of the student details from the url
  StudentModel.findOneAndRemove({_id: id}, (err) => {
    if (err){
      return (err, "Cannot delete the student");
    }
    res.send("Student Profile Deleted Successfully");
  });
})

//**Route to get all the students in a department */
app.get('/allstudents/:department', (req, res) => {
  let department = req.params.department; //get the Id of the student details from the url
  StudentModel.find({department: department}, (err, doc) => {
    if (err){
      return handleError(err);
    }
    res.send(doc);
  })
})


//server running
app.listen(port, () => {
    console.log(`App is running on ${port}`);  
})


module.exports = app;


