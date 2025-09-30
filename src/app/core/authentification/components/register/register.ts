import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../authService/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterData } from '../../interfaces/registerData';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/language-switcher/language-switcher';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule , TranslatePipe, LanguageSwitcher],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  registerForm! : FormGroup;

  constructor () {
    this.registerForm  = this.fb.group({
      first_name : ['', [Validators.required, Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)?$/u)]],
      last_name : ['', [Validators.required, Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)?$/u)]],
      telephone : ['', [Validators.required, Validators.pattern(/^[234]\d{7}$/)]],
      email : ['', [Validators.required, Validators.email]],
      profile : [null],
      password : ['', Validators.required],
      password2 : ['', Validators.required]
    });
  }

  selectedFile : File | null = null;
  onFileChange (event : Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

    showConfirmPassword: boolean = false;

    toggleConfirmPassword(): void {
      this.showConfirmPassword = !this.showConfirmPassword;
    }

    showPassword: boolean = false;

    togglePassword(): void {
      this.showPassword = !this.showPassword;
    }

  submit () {
    if (this.registerForm.valid) {
      console.log('form sent');
      // const fromData 
    }
    else {
      alert('form invalid')
    }
  }

  register (formData : RegisterData) {
     this.authService.register(formData).subscribe({
        next : (responce) => {
          console.log(responce);
        },
        error : (err) => {
          console.log(err);
          
        }
      });
  }

}
