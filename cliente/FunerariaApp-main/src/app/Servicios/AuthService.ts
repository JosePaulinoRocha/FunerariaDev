// src/app/Servicios/AuthService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3080/api/usuarios';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  isAdmin(): boolean {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.isAdmin === 1; // 1 indica que es admin
    }
    return false;
  }
  
}
