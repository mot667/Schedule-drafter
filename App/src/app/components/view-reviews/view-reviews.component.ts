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
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'viewreviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviews implements OnInit {
  timetables: any[] = [];
  publicTimetables: any[] = [];
  displayedColumns: string[] = ['ClassName', 'Subject', 'Review', 'timestamp'];
  dataSource: any = new MatTableDataSource(this.timetables);

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  displayAdminStuff: boolean = false;

  constructor(private tutorialService: TutorialService,private dialog: MatDialog, private _snackBar: MatSnackBar,private router: Router,public auth: AuthService) { 

    
  }

  ngOnInit(){
    var userEmail = localStorage.getItem('userEmail');
    this.tutorialService.getReview({})
    .subscribe(
      response => {
          console.log(response)
        this.timetables = response;

        response.forEach(element => {
          this.options.push(element.className);
          if(element.isPublic == true) {
              this.publicTimetables.push(element);
          }
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
        //console.log("userID: " + this.userID);
        localStorage.setItem('userEmail',userProfile.email);
        this.tutorialService.checkIfAdmin({userID: userProfile.sub})
        .subscribe(
          response => {
            console.log(response)
            if(response != null) {
              this.displayAdminStuff = true;
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


  onDelete() {
    //console.log(this.myControl.value);
    this.tutorialService.deleteCourse({data:this.myControl.value, userEmail: localStorage.getItem('userEmail')})
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
    this.tutorialService.deleteAll({userEmail:localStorage.getItem('userEmail')})
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

  onEdit(selectedTimetable) {
    console.log(selectedTimetable);
    localStorage.setItem('_id', selectedTimetable._id);
    localStorage.setItem('name', selectedTimetable.name);
    localStorage.setItem('courses', JSON.stringify(selectedTimetable.courses));
    localStorage.setItem('isPublic', selectedTimetable.isPublic);
    localStorage.setItem('userEmail', selectedTimetable.userEmail);
    localStorage.setItem('description',selectedTimetable.description);
    this.router.navigate(['edittimetable'])
  }

  changeStatus(id, isPublic) {
      this.tutorialService.changeReviewStatus({reviewID:id, isPublic: isPublic})
      .subscribe(
        response => {
          console.log(response);
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
navigateToViewReviews() {
    this.router.navigate(['viewreviews']);
  }


}