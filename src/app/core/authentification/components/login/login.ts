import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../authService/auth';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/language-switcher/language-switcher';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, TranslatePipe, LanguageSwitcher],
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


  submit () {
    if ( this.loginForm.valid ) {
      const telephone = this.loginForm.get('telephone')?.value
      const password = this.loginForm.get('password')?.value
      console.log('form sent');
      
      this.authService.login(telephone, password).subscribe({
          next : (responce) => {
              console.log(responce);
            },
            error : (err) => {
                alert(err)
              }
            }
            )
          }
    else {
            console.log('form not sent');
          }
        }
}

