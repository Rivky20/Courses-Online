import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateToCourses(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/courses']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}