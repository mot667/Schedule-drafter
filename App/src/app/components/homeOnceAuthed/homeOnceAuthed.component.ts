import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorialService} from '../../services/tutorial.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from "@angular/router";
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-home-once-authed',
  templateUrl: './homeOnceAuthed.component.html',
  styleUrls: ['./homeOnceAuthed.component.css']
})
export class HomeOnceAuthed implements OnInit {
  title = 'se3316-tkeech2-lab5';
  isAuthenticated: boolean;
  profileJson: string = null;
  userID = '';
  allUsers = [] = [];
  displayAdminStuff: boolean = false;
  
  constructor(
    private router: Router,
    public auth: AuthService,
    private tutorialService: TutorialService,
    ) {
    }
  
 ngOnInit(){

  //console.log(this.auth.getAccessTokenSilently())
    this.auth.user$.subscribe(userProfile => {
        this.profileJson = userProfile.email;
        this.userID = userProfile.sub;
        //console.log("userID: " + this.userID);
        localStorage.setItem('userEmail',this.profileJson);
        this.tutorialService.addUser({userID:userProfile.sub})
        .subscribe(
          response => {
              console.log(response)
          },
          error => {
            console.log(error);
          }
        )

        this.tutorialService.getAllUsers({})
        .subscribe(
          response => {
              console.log(response)
              this.allUsers = response;
          },
          error => {
            console.log(error);
          }
        )

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

  navigateToLandingPage() {
    this.router.navigate(['']);
  }

  makeAdmin(userID) {
    this.tutorialService.makeAdmin({userID: userID})
    .subscribe(
      response => {
        console.log(response)   
      },
      error => {
        console.log(error);
      }
    )
  }

  changeActive(userID,active) {
    this.tutorialService.changeActive({userID: userID, active:active})
    .subscribe(
      response => {
        console.log(response)   
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
