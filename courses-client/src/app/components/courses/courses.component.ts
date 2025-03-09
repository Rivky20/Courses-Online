import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/coursesdata.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/cuorse';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  lessons: any[] = [];

  constructor(private coursesService: CoursesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.map(course => ({
          ...course,
          isDetailsOpen: false
        }));
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }

  joinCourse(courseId: number) {
    // שינוי כאן - בדיקה אם המשתמש מחובר
    if (!this.authService.isAuthenticated()) {
      console.error('User not authenticated.');
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      return; // אם אין userId, נצא מהפונקציה
    }

    this.coursesService.joinCourse(courseId, userId).subscribe({
      next: (response) => {
        console.log('Joined course successfully:', response);
        this.courses = this.courses.map(course => 
          course.id === courseId 
            ? { ...course, isEnrolled: true }
            : course
        );
      },
      error: (error) => {
        console.error('Error joining course:', error);
      }
    });
  }

  showCourseDetails(courseId: number) {
    this.coursesService.getCourseDetails(courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
        this.loadLessons(courseId);
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }

  loadLessons(courseId: number) {
    this.coursesService.getLessons(courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error fetching lessons:', error);
      }
    });
  }

  toggleCourseDetails(course: Course) {
    course.isDetailsOpen = !course.isDetailsOpen;
    if (course.isDetailsOpen && !this.selectedCourse) {
      this.showCourseDetails(course.id);
    }
  }
}