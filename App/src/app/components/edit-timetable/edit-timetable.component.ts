import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.css']
})
export class EditTimetable implements OnInit {
  addScheduleFormGroup: FormGroup;
  addCourseFormGroup: FormGroup;
  searchResults: any;
  selectedCourses: any[] = ["delete"];
  courses: any[] = JSON.parse(localStorage.getItem('courses'));
  displayedColumns: any[] = ['subject','className'];
  currentScheduleName: string = localStorage.getItem('name');
  currentDescription: string = localStorage.getItem('description');
  color = 'primary';
  isPublic = localStorage.getItem('isPublic') == 'true' ;
  profileJson: string = null;
  userEmail: string = null;

  dataSource: any = new MatTableDataSource(this.selectedCourses);
  currentCourses: any = new MatTableDataSource(this.courses);

  constructor(
    private _formBuilder: FormBuilder, 
    private tutorialService: TutorialService,
    private router: Router,
    private dialog: MatDialog,
    public auth: AuthService,
    ) { }

  async ngOnInit(){
    this.addScheduleFormGroup = this._formBuilder.group({
      scheduleName: ['', Validators.required],
      scheduleDescription: ['']
    });
    this.addCourseFormGroup = this._formBuilder.group({
      subjectCode: ['', Validators.required],
      courseCode: ['', Validators.required],
      courseComponent: ['', Validators.required],
  });
  this.userEmail = localStorage.getItem('userEmail');
  
}
addSchedule() {
  var newName = this.addScheduleFormGroup.value.scheduleName;
  var newDescription = this.addScheduleFormGroup.value.scheduleDescription;


  this.currentScheduleName = this.addScheduleFormGroup.value.scheduleName;
  if(newName == ""){
    newName = localStorage.getItem('name');
  }

  if(newDescription == ""){
    newDescription = localStorage.getItem('description');
  }
  this.tutorialService.editSchedule({name:localStorage.getItem('name'), description:newDescription, isPublic:this.isPublic, userEmail: this.userEmail, newName:newName})
  .subscribe(
    response => {
      console.log(response);
      if(response.succes == false) {
        const dialogRef = this.dialog.open
        (AlertDialogComponent,{
          data:{
            message: `Schedule by the name ${this.currentScheduleName} already exists`,
            buttonText: {
              cancel: 'OK'
            }
          },
        });
      }
    },
    error => {
      console.log(error);
    }
  )
  
}
addCourse() {
  console.log(this.addCourseFormGroup.value);
  this.tutorialService.getAll(this.addCourseFormGroup.value)
  .subscribe(
    response => {
      this.searchResults = response;
      console.log(response);
    },
    error => {
      console.log(error);
    }
  )
}

onNewCourseSelected(event,v) {
  if(this.selectedCourses.includes(event.option._value,0) == true) {
    for(let x = 0; x < this.selectedCourses.length;x++) {
      if(this.selectedCourses[x].timetable.class_nbr == event.option._value.timetable.class_nbr) {
        this.selectedCourses.splice(x,1);
        this.dataSource.data =this.selectedCourses;
      }
    }
  } else {
    this.selectedCourses.push(event.option._value);
    this.dataSource.data = this.selectedCourses;
  }
  console.log(this.selectedCourses);
}


saveCourseLoad() {
    console.log(this.currentScheduleName);
    //console.log(this.selectedCourses);
    this.tutorialService.addCourses({name:this.currentScheduleName,courses:this.selectedCourses})
    .subscribe(
      response => {
        console.log(response);
      },
        error => {
          const dialogRef = this.dialog.open
          (AlertDialogComponent,{
            data:{
              message: `${this.currentScheduleName} Schedule saved`,
              buttonText: {
                cancel: 'OK'
              }
            },
          });
          this.ngOnInit();
        }
      )

    
  
}
navigateToTimetable() {
  this.router.navigate(['search']);
}

navigateToMakeTimetable() {
  this.router.navigate(['maketimetable']);
}

navigateToViewTimetable() {
  this.router.navigate(['viewtimetable']);
}


changedPrivacy() {
  this.isPublic = !this.isPublic;
  console.log(this.isPublic);
}


//addCourses(name, courses):
  


}