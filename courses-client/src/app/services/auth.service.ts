import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  role: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  login(loginData: LoginData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, loginData)
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.userSubject.next(user);
        })
      );
  }

  register(registerData: RegisterData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, registerData)
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.userSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return this.userSubject.value?.id || null;
  }

  getRole(): string | null {
    return this.userSubject.value?.role || null;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}