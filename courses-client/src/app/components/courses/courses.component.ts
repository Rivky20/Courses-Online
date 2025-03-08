import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/coursesdata.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  baseUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API
  selectedCourse: any;
  lessons: any[] | undefined;

  constructor(private coursesService: CoursesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  showCourseDetails(courseId: number) {
    this.coursesService.getCourseDetails(courseId).subscribe(
      (course) => {
        this.selectedCourse = course;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );

    this.coursesService.getLessons(courseId).subscribe(
      (lessons) => {
        this.lessons = lessons;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  joinCourse(courseId: number) {
    const userId = this.authService.getUserId();
    console.log('User ID:', userId); // Debugging line
    if (userId) {
      this.coursesService.joinCourse(courseId, userId).subscribe(
        (response: any) => {
          console.log('Joined course successfully:', response);
          this.ngOnInit();
        },
        (error: any) => {
          console.error('Error joining course:', error);
        }
      );
    } else {
      console.error('User not authenticated.');
    }
  }

  toggleCourseDetails(course: any) {
    course.isDetailsOpen = !course.isDetailsOpen;
    if (course.isDetailsOpen) {
      this.showCourseDetails(course.id);
    }
  }
}