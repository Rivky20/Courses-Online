import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <h2>הרשמה</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">שם:</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            [class.error]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched"
          >
          <div class="error-message" *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched">
            אנא הזן שם
          </div>
        </div>

        <div class="form-group">
          <label for="email">אימייל:</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
          >
          <div class="error-message" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
            אנא הזן כתובת אימייל תקינה
          </div>
        </div>

        <div class="form-group">
          <label for="password">סיסמה:</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
          >
          <div class="error-message" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
            אנא הזן סיסמה (מינימום 6 תווים)
          </div>
        </div>

        <button type="submit" [disabled]="registerForm.invalid">הרשם</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    input.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/courses']);
        },
        error: (error: any) => {
          console.error('Registration error:', error);
          // כאן אפשר להוסיף הודעת שגיאה למשתמש
        }
      });
    }
  }
}