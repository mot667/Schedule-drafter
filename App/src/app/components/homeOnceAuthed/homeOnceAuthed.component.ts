import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from '../../services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home-once-authed',
  templateUrl: './homeOnceAuthed.component.html',
  styleUrls: ['./homeOnceAuthed.component.css']
})
export class HomeOnceAuthed implements OnInit {
  title = 'se3316-tkeech2-lab5';
  isAuthenticated: boolean;

  
  constructor(
    private router: Router,
    public authService: AuthService
    ) {
      this.authService.isAuthenticated.subscribe(
        (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
      );
    }
  
 async ngOnInit() {
  this.isAuthenticated = await this.authService.checkAuthenticated();
}

logout() {
  this.authService.logout('/');
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
