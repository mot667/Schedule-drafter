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

  editSchedule(name): Observable<any> {
    localStorage.setItem("name",name.newName);
    localStorage.setItem("isPublic",name.isPublic);
    localStorage.setItem("description", name.description);
    return this.http.post(`${baseUrl}/timetable/editTimeTable`,name);
  }

  getTimetables(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable`, data);
  }

  getPublicTimetables(): Observable<any> {
    return this.http.get(`${baseUrl}/publictimetable`);
  }

  addCourses(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/addSchedule`, data);
  }

  deleteCourse(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/deleteTimeTable`, data);
  }

  deleteAll(data): Observable<any> {
    return this.http.post(`${baseUrl}/timetable/deleteALL`, data);
  }

  postReview(data): Observable<any> {
    return this.http.post(`${baseUrl}/postreview`, data);
  }

  getReview(data): Observable<any> {
    return this.http.post(`${baseUrl}/getreview`, data); 
  }

  searchKeyword(data): Observable<any> {
    return this.http.post(`${baseUrl}/searchkeyword`, data);
  }

  checkIfAdmin(data): Observable<any> {
    return this.http.post(`${baseUrl}/checkifadmin`, data);
  }

  changeReviewStatus(data): Observable<any> {
    return this.http.post(`${baseUrl}/changereviewstatus`, data);
  }


}