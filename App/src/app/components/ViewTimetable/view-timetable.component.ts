import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";


@Component({
  selector: 'viewtimetables',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {
  timetables: any[] = [];
  displayedColumns: string[] = ['Section', 'Component', 'Class Nbr', 'Days', 'Start Time', 'End Time', 'Location', 'Instructor', 'Requisites and Constraints', 'Status', 'Campus'];
  dataSource: any = new MatTableDataSource(this.timetables);

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private tutorialService: TutorialService,private dialog: MatDialog, private _snackBar: MatSnackBar,private router: Router) { 

    
  }

  ngOnInit(){
    var userEmail = localStorage.getItem('userEmail');
    this.tutorialService.getTimetables({userEmail: userEmail})
    .subscribe(
      response => {
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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onDelete() {
    //console.log(this.myControl.value);
    this.tutorialService.deleteCourse({data:this.myControl.value})
    .subscribe(
      response => {
        console.log(response);
        if(response.succes == false) {
          const dialogRef = this.dialog.open
          (AlertDialogComponent,{
            data:{
              message: `Schedule by the name ${this.myControl.value} dosen't exist`,
              buttonText: {
                cancel: 'OK'
              }
            },
          });
        } else if(response.succes == true) {
          this.openSnackBar("Successfully Deleted","OK")
          this.ngOnInit();
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteAll() {
    this.tutorialService.deleteAll()
    .subscribe(
      response => {
        console.log(response);
        if(response.success == true) {
          this.openSnackBar("Successfully Deleted","OK")
          this.ngOnInit();
        }
      },
      error => {
        console.log(error);
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


}