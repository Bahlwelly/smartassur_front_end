import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../companies/interfaces/company';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private http = inject(HttpClient);
 private productCompanyApi = 'http://192.168.100.80:8000/api/products/company';
 private productDetailsApi = 'http://192.168.100.80:8000/api/products';
 
 getProductCompany (id : number) : Observable<Company> {
  return this.http.get<Company>(`${this.productCompanyApi}/${id}`);
 }

 getProductDetails (id : number) : Observable<Product> {
  return this.http.get<Product>(`${this.productDetailsApi}/${id}`);
 }
}
