import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../contract';
import { Company } from '../../companies/interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
    private http = inject(HttpClient);
    private contractsApi = 'http://192.168.100.178:8000/api/contract';
    private addContractApi = 'http://192.168.100.178:8000/api/contract/add/';
    private userContractsApi = 'http://192.168.100.178:8000/api/contract/user';
    private contractCompanyApi =  'http://192.168.100.178:8000/api/contract/company';

    getUserContracts (user_id : number) : Observable <Contract[]> {
      return this.http.get<Contract[]>(`${this.userContractsApi}/${user_id}`);
    }
    
    getContractsCompany (contract_id : number) : Observable <Company> {
      return this.http.get<Company>(`${this.contractCompanyApi}/${contract_id}`);
    }

    token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : sessionStorage.getItem('access_token')
    addContract (newContract : any) {
      return this.http.post(`${this.addContractApi}`, newContract,{ headers: {
         'Content-Type': 'application/json',
          'Authorization' : `Bearer  ${this.token}`
        }
    });
    }
}
