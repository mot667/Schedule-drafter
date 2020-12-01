import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }


  getAll(data): Observable<any> {
    return this.http.post(`${baseUrl}/courses`,data);
  }

  createSchedule(name): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/createTimeTable`,name);
  }






  getTimetables(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable`, data);
  }

  addCourses(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/addSchedule`, data);
  }

  deleteCourse(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/deleteTimeTable`, data);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/timetable/deleteALL`);
  }
}