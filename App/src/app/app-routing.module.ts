import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchCoursesComponent} from './components/SearchCourses/search-courses.component';
import {MakeTimetable} from './components/MakeTimetable/make-timetable.component';
import {ViewTimetableComponent} from './components/ViewTimetable/view-timetable.component'
import { LoginComponent } from './components/login/login.component';
import { HomeOnceAuthed } from './components/homeOnceAuthed/homeOnceAuthed.component';
import { AuthGuard } from '@auth0/auth0-angular';

//canActivate: [AuthGuardService]
const routes: Routes = [
  {path: 'home', component: HomeOnceAuthed, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'search', component:SearchCoursesComponent},
  {path:'maketimetable', component:MakeTimetable},
  {path:'viewtimetable', component:ViewTimetableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
