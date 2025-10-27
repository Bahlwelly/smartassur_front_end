import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/sidebar/sidebar';
import { Alert } from '../../../shared/alert/alert';
import { Auth } from '../../authentification/authService/auth';

@Component({
  selector: 'app-mainapp',
  imports: [RouterOutlet, Sidebar, Alert],
  templateUrl: './mainapp.html',
  styleUrl: './mainapp.scss'
})
export class Mainapp {
  lang = localStorage.getItem('userLang');
  isBigScreen : boolean = false;
  @ViewChild(Sidebar) sidebar! : Sidebar;
  ngOnInit () {
    if (window.innerWidth > 1250 && window.innerWidth < 1440) {
      this.isBigScreen = true;
    }
  }

  private authService = inject(Auth)
  private router = inject(Router);
  @ViewChild (Alert) alert! : Alert; 
  showConfirmation () {
    let pl = localStorage.getItem('userLang');
    let title = pl === 'en' ? "Are you sure ?" : pl === 'fr' ? "Etes vous sure ?" : "هل انت متأكد ؟";
    let message = pl === 'en' ? "Are you sure you want to leav the app ?" : pl === 'fr' ? "Etes vous sure que vou voulez quitter l'application ?" : "هل انت متأكد من أنك تريد مغادرة التطبيق ؟"
    
    this.alert.showAlert(title,
      message, 
      "info", 
      false, 
      true, 
      5000000, 
      () => {
        this.authService.logout().subscribe(
          { 
            next : (res)=> {
              console.log(res);
              this.router.navigate(['/'])
              sessionStorage.removeItem('connectedUser');
              localStorage.removeItem('connectedUser');

              sessionStorage.removeItem('access_token');
              localStorage.removeItem('access_token');

              sessionStorage.removeItem('refresh_token');
              localStorage.removeItem('refresh_token');  
            },
            error  : (err) => {
              console.log("logout failed : ",err);
            }
          }
        );
    })
  }
}
