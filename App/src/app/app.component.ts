import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from './services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'se3316-tkeech2-lab5';
  isAuthenticated: boolean;

  
  constructor(
    private router: Router,
    public auth: AuthService
    ) {
    }
  
 async ngOnInit() {
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
