var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const { response } = require('../app');
var studentModel = require('../models/student.model')



/* GET students listing. */
router.get('/', function(req, res, next) {
  res.send(' welcome to students ');
});


/* add students */
router.post('/add-student',(req,res)=>{
    let newStudent = new studentModel(
        {
             studentId : req.query.studentId, 
             firstName : req.query.firstName, 
             lastName : req.query.lastName, 
             age: req.query.age, 
             dep : req.query.dep , 
        }
    )

    newStudent.save((err,newStudent)=>{
        if(err) res.send(' error occured ');
        else res.send({
            status : 200 ,
            message : ' students added into database ',
            studentObj : newStudent,
        });
    })



})

router.get('/search',(req,res)=>{
    studentModel.find({age : req.query.age},(err,result)=>{
            res.send({status:200,stdObj:{result}})
    })
})


router.put('/update-student',(req,res)=>{
         let queryAge = req.query.Age
         studentModel.updateOne(
            {
                firstName : "nabil"
            },
            {
                age : Number(queryAge)
            },
           
            (err,result)=>{
                if(err) res.send(err)
                else res.send({status:200,students:result})
            }
         )
})

router.delete('/delete-student',(req,res)=>{
    let queryName = req.query.firstName
    studentModel.deleteOne(
        {
            firstName : queryName
        },
        (err,result)=>{
            if(err) res.send(err)
            else res.send({status:200,students:result})
        }
    )
})
module.exports = router;
