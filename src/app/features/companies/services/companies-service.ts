import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
    private http = inject(HttpClient);
    private companiesAPI = 'http://localhost:8000/corps/';

    getAllCompanies () : Observable<Company[]> {
      return this.http.get<Company[]>(this.companiesAPI);
    }
}
