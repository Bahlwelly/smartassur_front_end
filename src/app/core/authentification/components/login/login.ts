import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../authService/auth';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/language-switcher/language-switcher';
import { Alert } from '../../../../shared/alert/alert';
import { LoginResponce } from '../../interfaces/login-responce';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, TranslatePipe, LanguageSwitcher, Alert, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  loginForm! : FormGroup;


  constructor () {
    this.loginForm = this.fb.group({
      telephone : ['', [Validators.required, Validators.pattern(/^[234]\d{7}$/)]],
      password : ['', Validators.required]
    })
  }

  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  rm! : boolean;
  storeUser (responce : LoginResponce) {
    console.log(this.rm);
    
    if (this.rm) {
      sessionStorage.removeItem('connectedUser');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('access_token');

      localStorage.setItem('connectedUser', responce.user.toString());
      localStorage.setItem('refresh_token', responce.refresh_token.toString());
      localStorage.setItem('access_token', responce.access_token.toString());

      console.log('the connected user is saved in the local storage');
    }
    else {
      localStorage.removeItem('connectedUser');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');

      sessionStorage.setItem('connectedUser', responce.user.toString());
      sessionStorage.setItem('refresh_token', responce.refresh_token.toString());
      sessionStorage.setItem('access_token', responce.access_token.toString());

      console.log('the connected user is saved in the session storage');
    }
  }


  @ViewChild(Alert) alert! : Alert;
  preferedLang = localStorage.getItem('userLang') || 'en';

  router = inject(Router);
  
  submit () {
    if ( this.loginForm.valid ) {
      const telephone = this.loginForm.get('telephone')?.value
      const password = this.loginForm.get('password')?.value
      console.log('form sent');
      
      this.authService.login(telephone, password).subscribe({
        next : (responce) => {
              this.router.navigate(['/main']);
              console.log(responce);
              this.storeUser(responce)
            },
            error : (err) => {
                if (this.preferedLang === 'en') {
              this.alert.showAlert("Error", "Something went wrong please try again later.",
                "error",
                true,
                false,
                5000
              );
            }
            else if (this.preferedLang === 'fr') {
              this.alert.showAlert("Erreur", "Quelque chose s’est mal passé, veuillez réessayer plus tard.",
                "error",
                true,
                false,
                5000
              );
            }
            else {
              this.alert.showAlert("خطأ", "حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا.",
                "error",
                true,
                false,
                5000
              );
            }
          }
            }
            )
          }
    else {
            if (this.preferedLang === 'en') {
              this.alert.showAlert("Error", "The phone number or the password are incorrect please try again",
                "error",
                true,
                false,
                5000
              );
            }
            else if (this.preferedLang === 'fr') {
              this.alert.showAlert("Erreur", "Le numéro de téléphone ou le mot de passe est incorrect, veuillez réessayer.",
                "error",
                true,
                false,
                5000
              );
            }
            else {
              this.alert.showAlert("خطأ", "رقم الهاتف أو كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.",
                "error",
                true,
                false,
                5000
              );
            }
          }
        }
}

