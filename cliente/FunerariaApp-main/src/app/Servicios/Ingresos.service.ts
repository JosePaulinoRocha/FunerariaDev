import { Ingreso } from '../Modelos/Ingresos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosServices {
  private myAppUrl: string;
  private MyApiUrl: string;
  private MyApiUrlIngreso: string;
  private MyApiUrlIngresoPost: string;
  private MyApiUrlIngresoUpdate: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.MyApiUrl = 'api/usuarios/';
    this.MyApiUrlIngreso = 'GetUsuarios/';
    this.MyApiUrlIngresoPost = 'PostIngresos/';
    this.MyApiUrlIngresoUpdate = 'UpdateIngreso/';

  }

  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlIngreso}`);
  }

  addIngreso(user: any): Observable<any> {
    return this.http.post<Ingreso[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlIngresoPost}`, user);
  }

  updateIngreso(user: any): Observable<any> {
    return this.http.put<Ingreso[]>(`${this.myAppUrl}${this.MyApiUrl}${this.MyApiUrlIngresoUpdate}`, user);
  }

}
