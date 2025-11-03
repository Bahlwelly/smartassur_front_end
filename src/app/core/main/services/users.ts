import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private http = inject(HttpClient);
  private userDetailsApi = 'http://192.168.100.178:8000/api/auth/user';

  getUserDetails (id : number) : Observable<User> {
    return this.http.get<User>(`${this.userDetailsApi}/${id}`);
  }
}
