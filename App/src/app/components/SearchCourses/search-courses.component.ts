import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'searchcourses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.css']
})
export class SearchCoursesComponent implements OnInit {
  addScheduleFormGroup: FormGroup;
  addCourseFormGroup: FormGroup;
  searchResults: any;
  displayedColumns: string[] = ['Section'];





  constructor(
    private _formBuilder: FormBuilder, 
    private tutorialService: TutorialService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(){
    this.addScheduleFormGroup = this._formBuilder.group({
      scheduleName: ['', Validators.required]
    });
    this.addCourseFormGroup = this._formBuilder.group({
      subjectCode: ['', Validators.required],
      courseCode: ['', Validators.required],
      courseComponent: ['', Validators.required],



  });
}

addCourse() {
  //console.log(this.addCourseFormGroup.value);
  this.tutorialService.getAll(this.addCourseFormGroup.value)
  .subscribe(
    response => {
      this.searchResults = response;
      if(response[0] == 'Subject Code') {
        const dialogRef = this.dialog.open
        (AlertDialogComponent,{
          data:{
            message: `No courses with the Subject Code ${this.addCourseFormGroup.value}`,
            buttonText: {
              cancel: 'OK'
            }
          },
        });
        this.ngOnInit();
      }
      console.log(response);
    },
    error => {
      console.log(error);
    }
  )
}




}