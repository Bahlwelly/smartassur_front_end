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
    private loginapi = 'http://localhost:8000/auth/login/';
    private registerapi = 'http://localhost:8000/auth/register/';

    login (telephone : string, password : string) : Observable<LoginResponce> {
      return this.http.post<LoginResponce>(`${this.loginapi}`, {telephone : telephone, password : password})
    }

    register (user : RegisterData) : Observable<any> {
      return this.http.post<RegisterData>(this.registerapi, user);
    }
}
