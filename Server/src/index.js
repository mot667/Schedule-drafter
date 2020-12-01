const express = require("express");
const cors = require('cors');
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const MongoClient = require('mongodb').MongoClient
var path = require('path');
const bodyParser = require('body-parser');
var timetable = require('../CourseInformation.json');
const { response } = require("express");
const {validationResult, check } = require('express-validator');
const expAutoSan = require('express-autosanitizer');
dotenv.config();

var db = "";
var timetableCollection = "";


var courses = [];

app.use(cors());
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expAutoSan.all);

app.listen(3000, () => console.log("Server Up and running")); 
for (var key = 0; key < timetable.length; key++) {
    if (timetable.hasOwnProperty(key)) {
        var item = timetable[key];
        courses.push({
            courseCode: item.catalog_nbr,
            description: item.catalog_description,
            subjectCode: item.subject,
            className: item.className,
            timetable: item.course_info[0],
            component: item.course_info[0].ssr_component
        });            
    }
}


  MongoClient.connect(process.env.DB_CONNECT, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db('Timetables')
    timetableCollection = db.collection('tables')
  })
  .catch(error => console.error(error))


/*
mongoose.connection.on('error',function(){console.log("Failed to connect to DB")})
mongoose.connection.on('connection',function(){console.log("Connected to db!")})
*/

app.post("/api/courses",(req, res) => {
    
    if(req.autosan.body.subjectCode != '' && req.autosan.body.courseCode == '' && req.autosan.body.courseComponent == ''){
    let result = [];

    for(var x = 0; x < courses.length; x++) {
        if(courses[x].subjectCode == req.autosan.body.subjectCode) {
            result.push({subject:courses[x].subjectCode, className:courses[x].className,timetable:courses[x].timetable});
        }
    }
    if(result[0] == undefined) {
        result.push("Subject Code");
    }
    res.send(result);
    
}

if(req.autosan.body.subjectCode != '' && req.autosan.body.courseCode != ''){
    let result = [];
    if(req.autosan.body.courseComponent == '') {
    for(var x = 0; x < courses.length; x++) {
        if(courses[x].subjectCode == req.autosan.body.subjectCode && courses[x].courseCode == req.autosan.body.courseCode) {
            result.push({subject:courses[x].subjectCode, className:courses[x].className,timetable:courses[x].timetable});
        }
    }
    if(result[0] == undefined) {
        result.push("Course Code")
    }
}else {
    console.log(courses[0].component)
    for(var x = 0; x < courses.length; x++) {
        if(courses[x].subjectCode == req.autosan.body.subjectCode && courses[x].courseCode == req.autosan.body.courseCode && courses[x].component == req.autosan.body.courseComponent) {
            result.push({subject:courses[x].subjectCode, className:courses[x].className,timetable:courses[x].timetable});
        }
    }  
}
    res.send(result);
}

if(req.autosan.body.subjectCode == '' && req.autosan.body.courseCode == '' && req.autosan.body.courseComponent == ''){
    let result = [];
    for(var x = 0; x < courses.length; x++) {
            result.push({subject:courses[x].subjectCode, className:courses[x].className,timetable:courses[x].timetable});
    }
    res.send(result);
}



});

    app.post('/api/timetable/createTimeTable',async (req, res) => {

    timetableCollection.findOne({name:req.autosan.body.name})
       .then(result => {
           if(!result) {
            timetableCollection.insertOne({name:req.autosan.body.name, courses:[], isPublic: req.autosan.body.isPublic, userEmail: req.autosan.body.userEmail})
            .then(result2 => {
                console.log("Posted");
                res.send({succes:true})
            })
            .catch(error => console.error(error))
           }else {
               res.send({succes:false});
           }
       })
       .catch(error => console.log(error));
       



/*
        timetableCollection.insertOne({name:req.autosan.body.content, courses:[]})
        .then(result => {
            console.log("Posted");
            res.redirect(`/timetable/addcourses?paramter=${req.autosan.body.content}`);
        })
        .catch(error => console.error(error))
        */
    });

    app.post('/api/timetable/deleteTimeTable',async (req, res) => {

        timetableCollection.deleteOne({name: req.autosan.body.data})
        .then(result => {
            if(result.result.n != 0){
            //res.redirect('/timetable');
            res.send({succes:true});
        }else{
            res.send({succes:false});
        }
    })
        .catch(error => console.error(error))
    

    });

    app.get('/api/timetable', (req, res) => {
        var data;
        db.collection('tables').find().toArray()
        .then(results => {
        res.json(results);
        //  res.redirect('/timetable');
        })
        .catch(error => console.error(error))
      // ...
    });

    app.post("/api/courses/addCourses", (req, res) => {
    if(req.autosan.body.subjectCode != '' && req.autosan.body.courseCode == '' && req.autosan.body.courseComponent == ''){
        let result = [];
        for(var x = 0; x < courses.length; x++) {
            if(courses[x].subjectCode == req.autosan.body.subjectCode) {
                result.push({courseCode:courses[x].courseCode, courseInformation: courses[x].timetable });
            }
        }
        res.send(result);
    }
    
    if(req.autosan.body.subjectCode != '' && req.autosan.body.courseCode != ''){
        let result = [];
        if(req.autosan.body.courseComponent == '') {
        for(var x = 0; x < courses.length; x++) {
            if(courses[x].subjectCode == req.autosan.body.subjectCode && courses[x].courseCode == req.autosan.body.courseCode) {
                result.push({timetable:courses[x].timetable});
            }
        }
    }else {
        console.log(courses[0].component)
        for(var x = 0; x < courses.length; x++) {
            if(courses[x].subjectCode == req.autosan.body.subjectCode && courses[x].courseCode == req.autosan.body.courseCode && courses[x].component == req.autosan.body.courseComponent) {
                result.push({timetable:courses[x].timetable});
            }
        }  
    }
        res.send(result);
    }
    
    if(req.autosan.body.subjectCode == '' && req.autosan.body.courseCode == '' && req.autosan.body.courseComponent == ''){
        let result = [];
        for(var x = 0; x < courses.length; x++) {
                result.push({subject:courses[x].subjectCode, className:courses[x].className, allInformation:courses[x].timetable});
        }
        res.send(result);
    }
    
    
    
    });


app.post('/api/timetable/addSchedule',(req,res) => {

    let newCourses = req.autosan.body.courses;
    //console.log(req.autosan.body.name)
    
 
        timetableCollection.findOne({
            name:req.autosan.body.name
        }, function(err, timetable) {
            if (err) throw err;
            console.log(timetable);
    
            const courses = timetable.courses;
        newCourses.forEach(newCourse => {
            if (!courses.find(course=>course.allInformation.class_nbr===newCourse.timetable.class_nbr)){
                courses.push({
                    className: newCourse.className,
                    subjectCode: newCourse.subject ,
                    allInformation: newCourse.timetable
                })
            }
        })
    
            timetableCollection.updateOne({_id: timetable._id}, {
                $set: {courses: courses}
            }, saveErr => {
                if (!saveErr) {
                    res.send('yes');
                }
                res.status(500).send()
            });
          });
        
    
    

});


    
    

    



app.delete('/api/timetable/deleteAll',(req,res) => {
    timetableCollection.deleteMany({}, function(err,response) {
        if (err) throw err;
        res.send({success:true})
    })
})



app.get('/',(req, res) => {
    res.send('Hello World!');
    
});

app.get('/timetable',(req, res) => {
    res.sendFile(path.join(__dirname + '/client/timetable.html'));
    
});

app.get('/timetable/addCourses',(req, res) => {
    res.sendFile(path.join(__dirname + '/client/addClasses.html'));
    
});



