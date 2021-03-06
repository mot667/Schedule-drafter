import { Component,Inject, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from '../../services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


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
  searchKeywordFormGroup: FormGroup;
  searchResults: any;
  displayedColumns: string[] = ['Section'];

  timetables: any[] = [];
  displayedColumnsTimetables: string[] = ['Section', 'Component', 'Class Nbr', 'Days', 'Start Time', 'End Time', 'Location', 'Instructor', 'Requisites and Constraints', 'Status', 'Campus'];
  dataSource: any = new MatTableDataSource(this.timetables);

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  bestMatch: string = null;
  bestMatchClassName: string = null;
  bestMatchSubjectCode: string = null;

  

  
  constructor(
    private router: Router,
    public auth: AuthService,
    private _formBuilder: FormBuilder, 
    private tutorialService: TutorialService,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private doc: Document
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

    this.searchKeywordFormGroup = this._formBuilder.group({
      keywordInput: ['', Validators.required]
  });


    this.tutorialService.getPublicTimetables()
    .subscribe(
      response => {
        console.log(response)
        this.timetables = response;

        response.forEach(element => {
          this.options.push(element.name);
        });
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );


      },
      error => {
        console.log(error);
      }
    )

    this.auth.user$.subscribe(userProfile => {
      this.tutorialService.checkIfActive({userID:userProfile.sub})
      .subscribe(
        response => {
          if(response.active == false) {
            console.log(response.active) 
            window.alert("Contact Site admin")
            this.auth.logout({ returnTo: this.doc.location.origin });
          }         
        },
        error => {
          console.log(error);
        }
      )
  });
    

 } 
 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  searchKeyword() {
    //console.log(this.searchKeywordFormGroup.value.keywordInput);

    this.tutorialService.searchKeyword({input: this.searchKeywordFormGroup.value.keywordInput})
    .subscribe(
      response => {
        this.bestMatch = response.bestMatch;
        this.bestMatchClassName = response.bestMatch.className;
        this.bestMatchSubjectCode = response.bestMatch.subjectCode;
        
      },
      error => {
        console.log(error);
      }
    )

  }

  navigateToHomeOnceAuthed() {
    this.router.navigate(['home']);
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
