import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContractService } from '../../../features/contracts/service/contract-service';
import { Contract } from '../../../features/contracts/contract';
import { Company } from '../../../features/companies/interfaces/company';
import { ProductService } from '../../../features/products/service/product-service';

@Component({
  selector: 'app-dashboard',
  imports: [TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  isLargeScreen = window.innerWidth;
  lang = localStorage.getItem('userLang');
  private contractService = inject(ContractService);
  private productService = inject(ProductService);

  contracts : Contract[] = [];
  ac : number = 0;
  ec : number = 0;
  sec : number = 0;
  uc : number = 0;

  loadContracts () {
    const user_id = localStorage.getItem('connectedUser') ? localStorage.getItem('connectedUser') : sessionStorage.getItem('connectedUser');
    if (user_id) {
      this.contractService.getUserContracts(+user_id).subscribe({
        next : (data)=> {
            this.contracts = data;
            console.log(this.contracts);
            this.ac = this.contracts.filter(c => c.status === 'active').length;
            this.ec = this.contracts.filter(c => c.status === 'expired').length;
            this.uc = this.contracts.filter(c => !c.viewed && c.status === 'active').length;
            
            const today = new Date();
            const NEARLY_EXPIRED_DAYS = 3;

            this.sec = this.contracts.filter(contract => {
              const endDate = new Date(contract.end_date);
              const diffTime = endDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays > 0 && diffDays <= NEARLY_EXPIRED_DAYS;
            }).length;

            this.contracts.forEach(con => {
              this.getCompanyByProduct(con.product);              
            });
          },
          error : (err) => {
            console.log(err);
            
          }
      })
    }
  }

  companies : {[key : number] : Company} = {};

  getCompanyByProduct(product_id: number) {
    if (this.companies[product_id]) return;

    this.productService.getProductCompany(product_id).subscribe({
      next: (data) => {
        this.companies[product_id] = data;
      },
      error: (err) => console.log('Error fetching company:', err)
    });
  }

  ngOnInit () {
    this.loadContracts();
  }

  getStatus (contract : Contract) {
    return contract.status
  }

  translateStatus (status : string) {
    let newStatus = status;
    if (this.lang === "ar") { 
      switch (status) {
        case 'active' :
          newStatus = 'نشط';
          break;
        
        case 'expired' :
          newStatus = 'منتهي';
          break;
        
        case 'pending' :
          newStatus = 'معلق';
          break;
        
        case 'canceled' : 
          newStatus = 'ملغي';
          break
      }  
    }
    else if (this.lang === "fr") { 
      switch (status) {
        case 'active' :
          newStatus = 'Actif';
          break;

        case 'expired' :
          newStatus = 'Expiré';
          break;

        case 'pending' :
          newStatus = 'En attente';
          break;

        case 'canceled' : 
          newStatus = 'Annulé';
          break;
      }  
    }

    return newStatus;
  }

  translateTypes (type : string) {
    let newType = type;

    if (this.lang === 'ar') {
      switch (type) {
        case 'health':
          newType = 'صحي';
          break;

        case 'property':
          newType = 'عقاري';
          break;

        case 'vehicle':
          newType = 'مركبة';
          break;

        case 'travel':
          newType = 'سفر';
          break;

        case 'buisness':
          newType = 'تجاري';
          break;

        case 'speciality':
          newType = 'خاص';
          break;
      }
    }
    else if (this.lang === 'fr') {
      switch (type) {
        case 'health':
          newType = 'Santé';
          break;

        case 'property':
          newType = 'Immobilier';
          break;

        case 'vehicle':
          newType = 'Véhicule';
          break;

        case 'travel':
          newType = 'Voyage';
          break;

        case 'buisness':
          newType = 'Affaires';
          break;

        case 'speciality':
          newType = 'Spécialité';
          break;
      }
    }
    return newType;
  }
}
