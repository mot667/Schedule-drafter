import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MakeTimetable} from './components/MakeTimetable/make-timetable.component';
import {ViewTimetableComponent} from './components/ViewTimetable/view-timetable.component';
import {AlertDialogComponent} from './components/alert-dialog/alert-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SearchCoursesComponent} from './components/SearchCourses/search-courses.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './components/login/login.component';
import { HomeOnceAuthed } from './components/homeOnceAuthed/homeOnceAuthed.component';
import {MatCardModule} from '@angular/material/card';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import {LandingPage} from './components/landing-page/landing-page.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {EditTimetable} from './components/edit-timetable/edit-timetable.component';
import {ReviewDialogComponent} from './components/review-dialog/review-dialog.component';
import {ViewReviews} from './components/view-reviews/view-reviews.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MakeTimetable,
    ViewTimetableComponent,
    AlertDialogComponent,
    SearchCoursesComponent,
    LoginComponent,
    HomeOnceAuthed,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    LandingPage,
    EditTimetable,
    ReviewDialogComponent,
    ViewReviews,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    BrowserModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatSlideToggleModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  exports:[MakeTimetable, ViewTimetableComponent,AlertDialogComponent, SearchCoursesComponent, LoginComponent, HomeOnceAuthed, LandingPage, EditTimetable, ReviewDialogComponent, ViewReviews],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
