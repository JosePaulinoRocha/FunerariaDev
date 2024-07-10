import { Usuarios } from '../Modelos/Usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServices {
  private myAppUrl: string;
  private MyApiUrl: string;
  private MyApiUrlUser: string;
  private MyApiUrlUserPost: string;
  private MyApiUrlUserUpdate: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/usuarios/';
    this.MyApiUrlUser = 'GetUsuarios/';
    this.MyApiUrlUserPost = 'PostUsers/';
    this.MyApiUrlUserUpdate = 'UpdateUser/';

  }

  getUsers(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlUser}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<Usuarios[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlUserPost}`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<Usuarios[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlUserUpdate}`, user);
  }

}
