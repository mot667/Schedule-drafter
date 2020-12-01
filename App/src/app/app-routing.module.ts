import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchCoursesComponent} from './components/SearchCourses/search-courses.component';
import {MakeTimetable} from './components/MakeTimetable/make-timetable.component';
import {ViewTimetableComponent} from './components/ViewTimetable/view-timetable.component'
import { LoginComponent } from './components/login/login.component';
import { HomeOnceAuthed } from './components/homeOnceAuthed/homeOnceAuthed.component';
import { AuthGuard } from '@auth0/auth0-angular';
import {LandingPage} from './components/landing-page/landing-page.component';
import {EditTimetable} from './components/edit-timetable/edit-timetable.component';


//canActivate: [AuthGuardService]
const routes: Routes = [
  {path: '', component: LandingPage},
  {path: 'home', component: HomeOnceAuthed, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'search', component:SearchCoursesComponent},
  {path:'maketimetable', component:MakeTimetable},
  {path:'viewtimetable', component:ViewTimetableComponent},
  {path: 'edittimetable', component:EditTimetable}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
