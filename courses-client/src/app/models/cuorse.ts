
export interface Course {
    id: number;
    title: string;
    description: string;
    teacherId: number;
    enrolledStudents?: number;
    isEnrolled?: boolean;
}
  

  export interface EnrollmentResponse {
    message: string;
}