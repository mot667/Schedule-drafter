import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from '../../services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPage implements OnInit {
  title = 'se3316-tkeech2-lab5';
  isAuthenticated: boolean;
  profileJson: string = null;
  addScheduleFormGroup: FormGroup;
  addCourseFormGroup: FormGroup;
  searchResults: any;
  displayedColumns: string[] = ['Section'];
  

  
  constructor(
    private router: Router,
    public auth: AuthService,
    private _formBuilder: FormBuilder, 
    private tutorialService: TutorialService,
    private dialog: MatDialog,
    ) {
    }
  
 ngOnInit(){
    this.addScheduleFormGroup = this._formBuilder.group({
        scheduleName: ['', Validators.required]
      });
      this.addCourseFormGroup = this._formBuilder.group({
        subjectCode: ['', Validators.required],
        courseCode: ['', Validators.required],
        courseComponent: ['', Validators.required]
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



  /*
  navigateToTimetables() {
    this.tutorialService.navigateToTimetables()
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
  */


}
