import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponce } from '../interfaces/login-responce';
import { RegisterData } from '../interfaces/registerData';

@Injectable({
  providedIn: 'root'
})
export class Auth {
    private http = inject(HttpClient);
    private loginapi = 'http://192.168.100.178:8000/api/auth/login/';
    private logoutapi = 'http://192.168.100.178:8000/api/auth/logout/';
    private registerapi = 'http://192.168.100.178:8000/api/auth/register/';

    login (telephone : string, password : string) : Observable<LoginResponce> {
      return this.http.post<LoginResponce>(`${this.loginapi}`, {telephone : telephone, password : password})
    }

    logout () {
      return this.http.post(`${this.logoutapi}`, {"refresh_token" : localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : sessionStorage.getItem('refresh_token')});
    }

    register (user : RegisterData) : Observable<any> {
      return this.http.post<RegisterData>(this.registerapi, user);
    }
}
