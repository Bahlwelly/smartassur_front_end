import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from '../../../products/service/product-service';
import { Product } from '../../../products/product';
import { Company } from '../../../companies/interfaces/company';
import { FormsModule } from '@angular/forms';
import { Contract } from '../../contract';
import { ContractService } from '../../service/contract-service';

@Component({
  selector: 'app-add-new-contract',
  imports: [TranslatePipe, FormsModule],
  templateUrl: './add-new-contract.html',
  styleUrl: './add-new-contract.scss'
})
export class AddNewContract {
  selectedType : string = 'Health';
  lang = localStorage.getItem('userLang');

  private PordService = inject(ProductService);
  products : Product[] = [];

  loadProucts () {
    this.PordService.getProducts().subscribe({
      next : (data) => {
        this.products = data;
        this.products.forEach(prd => {
          this.getCompanyByProduct(prd.id);
        });
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

    companies : {[key : number] : Company} = {};
  
    getCompanyByProduct(product_id: number) {
      if (this.companies[product_id]) return;
  
      this.PordService.getProductCompany(product_id).subscribe({
        next: (data) => {
          this.companies[product_id] = data;
        },
        error: (err) => console.log('Error fetching company:', err)
      });
    }

    getCategory (categories : number []) {
      const mainCat = categories.find(cat => cat <= 8);
      let cat : string = '';
      switch (mainCat) {
        case 3 :
          cat = 'Health';
          break;
        case 4 :
          cat = 'Property';
          break;
        case 5 :
          cat = 'Vehicle';
          break;
        case 6 :
          cat = 'Travel';
          break;
        case 7 :
          cat = 'Buisness';
          break;
        case 8 :
          cat = 'Speciale';
          break;
      }

      return cat;
    }

  ngOnInit () {
    this.loadProucts();
    this.filterProducts();
  }

  filterProducts () : Product[] {
    let filteredProducts : Product[] = [];
    filteredProducts = this.products.filter(prod => this.getCategory(prod.category).toLocaleLowerCase() === this.selectedType.toLocaleLowerCase());
    // console.log(filteredProducts);

    return filteredProducts;
  }

  selectType (type : string) {
    this.selectedType = type;
    this.toggleOptions();
  }

  translateType (type : string) {
    let newTyp : string = '';
    if (this.lang === 'ar') {
      switch (type) {
        case 'Health' :
          newTyp = "الصحة";
          break;

        case 'Vehicle' :
          newTyp = "المركبات";
          break;

        case 'Property' :
          newTyp = "العقارات";
          break;

        case 'Travel' :
          newTyp = "السفر";
          break;

        case 'Buisness' :
          newTyp = "الاعمال";
          break;

        case 'Speciale' :
          newTyp = "مخصص";
          break;
      }
    }
    else if (this.lang === 'fr') {
      switch (type) {
        case 'Health' :
          newTyp = "Santé";
          break;
  
        case 'Vehicle' :
          newTyp = "Véhicule";
          break;
  
        case 'Property' :
          newTyp = "Propriété";
          break;
  
        case 'Travel' :
          newTyp = "Voyage";
          break;
  
        case 'Buisness' :
          newTyp = "Affaires";
          break;
  
        case 'Speciale' :
          newTyp = "Spéciale";
          break;
      }
    }
    else {
      this.filterProducts();
      newTyp = type;
    }
    this.filterProducts();
    return newTyp;

  }

  showOptions : boolean = false;
  toggleOptions () {
    this.showOptions = !this.showOptions;
  }

  showConfirmation : boolean = false;
  duration_num : number = 0;
  duration_type : string = 'y';
  
  selectedProduct : number = 0;
  selectProduct (id : number) {
    this.selectedProduct = id;
    console.log(this.selectedProduct);
    this.toggleConfirmation();
  }

  toggleConfirmation () {
    this.showConfirmation = !this.showConfirmation;
  }


  private contractsService = inject(ContractService);
  addContract () {
    let currentDate = new Date();
    let end_date = new Date(currentDate);
    if (this.duration_type === 'm') {
      end_date.setMonth(currentDate.getMonth() + this.duration_num)
    }
    else {
      end_date.setFullYear(currentDate.getFullYear() + this.duration_num)
    }

    const formatted_date = end_date.toISOString().split('T')[0];

    const newContract = {
      product : this.selectedProduct,
      type : this.selectedType,
      end_date : formatted_date,
    }

    this.contractsService.addContract(JSON.stringify(newContract)).subscribe({
      next : () => {
        console.log("all right the new contract is registered.");
      },
      error : (err) => {
        console.log("Nope!!\nSomething went worng");
        console.log('new contract : ', newContract );
      }
    })
  }
}
