export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  duration: string;
  isEnrolled?: boolean;
  isDetailsOpen?: boolean;
}
  

  export interface EnrollmentResponse {
    message: string;
}