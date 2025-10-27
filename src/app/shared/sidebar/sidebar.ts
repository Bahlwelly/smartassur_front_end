import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../core/main/interfaces/user';
import { Users } from '../../core/main/services/users';
import { Auth } from '../../core/authentification/authService/auth';
import { Router } from '@angular/router';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-sidebar',
  imports: [LanguageSwitcher, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  connectedUser! : User;
  private userService = inject(Users);

  loadUserDetails () {
    const id = localStorage.getItem('connectedUser') ? localStorage.getItem('connectedUser') : sessionStorage.getItem('connectedUser');
    
    if (id) {
      this.userService.getUserDetails(+id).subscribe(data => {
        this.connectedUser = data;
      });
    }
  }

  isOpen : boolean = false;
  isBigScreen : boolean = true;
  ngOnInit () {
    this.loadUserDetails();
    if (window.innerWidth > 1250 && window.innerWidth < 1440) {
      this.showSidebar = true;
      this.isOpen = true;
      this.isBigScreen = false;
    }
  }
  
  dir : string = 'rtl';

  ngAfterViewInit () {
    const lang = localStorage.getItem('userLang');

    if (lang === 'ar') {
      this.dir = 'rtl';
      console.log(`the document's direction is : ${this.dir}`);  
    }
    else {
      this.dir = document.documentElement.dir;  
      console.log(`the document's direction is : ${this.dir}`);  
    }
  }


  selected : string = 'dash';

  switchSelection (option : string) {
    this.selected = option;
  }

  showSidebar : boolean = false;



  toggleSidebar (show : boolean) {
    if (show) {
      this.showSidebar = true;
      this.isOpen = true;
    }
    else {
      this.isOpen = false;
      setTimeout (() => {
        this.showSidebar = false;
      }, 1000)
    }
  }

  @Output() logout = new EventEmitter<void>()

  onLogout () {
    this.logout.emit();
  }
}