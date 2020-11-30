import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchCoursesComponent} from './components/SearchCourses/search-courses.component';
import {MakeTimetable} from './components/MakeTimetable/make-timetable.component';
import {ViewTimetableComponent} from './components/ViewTimetable/view-timetable.component'

const routes: Routes = [
  {path:'search', component:SearchCoursesComponent},
  {path:'maketimetable', component:MakeTimetable},
  {path:'viewtimetable', component:ViewTimetableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
