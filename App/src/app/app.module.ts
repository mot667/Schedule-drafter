import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    MakeTimetable,
    ViewTimetableComponent,
    AlertDialogComponent,
    SearchCoursesComponent
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
    MatTooltipModule
  ],
  exports:[MakeTimetable, ViewTimetableComponent,AlertDialogComponent, SearchCoursesComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
