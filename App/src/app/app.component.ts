import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from './services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'se3316-tkeech2-lab4';

  
  constructor(
    private router: Router
    ) {}
  
  ngOnInit() {

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
