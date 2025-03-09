import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) { }

  // הוספת קורס
  joinCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/join`, {});
  }

  // עזיבת קורס
  leaveCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/leave`, {});
  }

  // קבלת רשימת קורסים שהמשתמש רשום אליהם
  getEnrolledCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/enrolled`);
  }

  // קבלת רשימת קורסים שהמשתמש לא רשום אליהם
  getAvailableCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available`);
  }
}