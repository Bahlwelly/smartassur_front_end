import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../authService/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterData } from '../../interfaces/registerData';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../../../shared/language-switcher/language-switcher';
import { Alert } from '../../../../shared/alert/alert';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule , TranslatePipe, LanguageSwitcher, Alert],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(Auth);
  private fb = inject(FormBuilder);
  registerForm! : FormGroup;

  constructor () {
    this.registerForm  = this.fb.group({
      first_name : ['', [Validators.required, Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)*$/u)]],
      last_name : ['', [Validators.required, Validators.pattern(/^[\p{L}]+(?: [\p{L}]+)*$/u)]],
      telephone : ['', [Validators.required, Validators.pattern(/^[234]\d{7}$/)]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      password2 : ['', Validators.required]
    });
  }

    showConfirmPassword: boolean = false;

    toggleConfirmPassword(): void {
      this.showConfirmPassword = !this.showConfirmPassword;
    }

    showPassword: boolean = false;

    togglePassword(): void {
      this.showPassword = !this.showPassword;
    }

    @ViewChild(Alert) alert! : Alert;
    preferedLang = localStorage.getItem('userLang') || 'en';

  submit () {
    if (this.registerForm.valid) {
      console.log('form sent');
      this.register(this.registerForm.value as RegisterData)
    }
    else if (this.registerForm.get('first_name')?.errors) {
      if (this.preferedLang === 'en') {
        this.alert.showAlert(
          "Input error",
          "The name you entered is invalid please check it and try again",
          "error",
          true,
          false,
          5000
        );
      }
      else if (this.preferedLang === 'fr') {
        this.alert.showAlert(
          "Erreur de saisie",
          "Le prenom que vous avez saisi n’est pas valide. Veuillez le vérifier et réessayer.",
          "error",
          true,
          false,
          5000
        );
      }
      else {
        this.alert.showAlert(
          "خطأ في الإدخال",
          "الاسم الذي أدخلته غير صالح. يرجى التحقق منه والمحاولة مرة أخرى.",
          "error",
          true,
          false,
          5000
        );
      }
    }
    else if (this.registerForm.get('last_name')?.errors) {
      if (this.preferedLang === 'en') {
        this.alert.showAlert(
          "Input error",
          "The last name you entered is invalid please check it and try again",
          "error",
          true,
          false,
          5000
        );
      }
      else if (this.preferedLang === 'fr') {
        this.alert.showAlert(
          "Erreur de saisie",
          "Le nom que vous avez saisi n’est pas valide. Veuillez le vérifier et réessayer.",
          "error",
          true,
          false,
          5000
        );
      }
      else {
        this.alert.showAlert(
          "خطأ في الإدخال",
          "الاسم العائلي الذي أدخلته غير صالح. يرجى التحقق منه والمحاولة مرة أخرى.",
          "error",
          true,
          false,
          5000
        );
      }
    }
    else if (this.registerForm.get('telephone')?.errors) {
      if (this.preferedLang === 'en') {
        this.alert.showAlert(
          "Input error",
          "The phone number you entered is invalid please check it and try again",
          "error",
          true,
          false,
          5000
        );
      }
      else if (this.preferedLang === 'fr') {
        this.alert.showAlert(
          "Erreur de saisie",
          "Le numero de telephone que vous avez saisi n’est pas valide. Veuillez le vérifier et réessayer.",
          "error",
          true,
          false,
          5000
        );
      }
      else {
        this.alert.showAlert(
          "خطأ في الإدخال",
          "رقم الهاتف الذي أدخلته غير صالح. يرجى التحقق منه والمحاولة مرة أخرى.",
          "error",
          true,
          false,
          5000
        );
      }
    }
    else if (this.registerForm.get('email')?.errors) {
      if (this.preferedLang === 'en') {
        this.alert.showAlert(
          "Input error",
          "The email you entered is invalid please check it and try again",
          "error",
          true,
          false,
          5000
        );
      }
      else if (this.preferedLang === 'fr') {
        this.alert.showAlert(
          "Erreur de saisie",
          "L'email que vous avez saisi n’est pas valide. Veuillez le vérifier et réessayer.",
          "error",
          true,
          false,
          5000
        );
      }
      else {
        this.alert.showAlert(
          "خطأ في الإدخال",
          "عنوان البريد الالكتروني الذي أدخلته غير صالح. يرجى التحقق منه والمحاولة مرة أخرى.",
          "error",
          true,
          false,
          5000
        );
      }
    }
    else {
      alert('form invalid')
    }
  }

  passwordErrors : string [] = [];
  passwordErrorTranslations: { [errorMsg: string]: { [lang: string]: string } } = {
  "This password is too short. It must contain at least 8 characters.": {
    "en": "This password is too short. It must contain at least 8 characters.",
    "fr": "Ce mot de passe est trop court. Il doit contenir au moins 8 caractères.",
    "ar": "كلمة المرور قصيرة جدًا. يجب أن تحتوي على 8 أحرف على الأقل."
  },
  "This password is too common.": {
    "en": "This password is too common.",
    "fr": "Ce mot de passe est trop commun.",
    "ar": "هذه كلمة المرور شائعة جدًا."
  },
  "This password is entirely numeric.": {
    "en": "This password is entirely numeric.",
    "fr": "Ce mot de passe est entièrement numérique.",
    "ar": "كلمة المرور تحتوي على أرقام فقط."
  },
  "The password is too similar to the username.": {
    "en": "The password is too similar to the username.",
    "fr": "Le mot de passe est trop similaire au nom d'utilisateur.",
    "ar": "كلمة المرور مشابهة جدًا لاسم المستخدم."
  },
  "Password confirmation doesn't match the password." : {
    "en" : "Password confirmation doesn't match the password.",
    "fr" : "La confirmation du mot de passe ne correspond pas au mot de passe.",
    "ar" : "تأكيد كلمة المرور لا يطابق كلمة المرور."
  }
};

  router = inject(Router);

  register (formData : RegisterData) {
     this.authService.register(formData).subscribe({
        next : (responce) => {
          console.log(responce);
          if (this.preferedLang === 'en') {
        this.alert.showAlert(
          "Success",
          "The new user registered successfully",
          "success",
          true,
          false,
          5000
        );
      }
      else if (this.preferedLang === 'fr') {
        this.alert.showAlert(
          "Succès",
          "Le nouveau utilisateur ete enregistre avec succès.",
          "success",
          true,
          false,
          5000
        );
      }
      else {
        this.alert.showAlert(
          "تمت العملية بنجاح",
          "تم حفظ المستخدم الجديد بنجاح.",
          "success",
          true,
          false,
          5000
        );

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      }
          
        },
        error : (err) => {
          if (err.error.password) {
            this.passwordErrors = err.error.password.map((msg : string) => {
              return this.passwordErrorTranslations[msg] ? this.passwordErrorTranslations[msg][this.preferedLang] || msg : msg; 
            });
            const alertMessage = this.passwordErrors.join('\n');
            this.alert.showAlert(
              this.preferedLang === 'fr' ? "Erreur" : this.preferedLang === 'en' ? "Error" : "خطأ",
              alertMessage,
              "error",
              true,
              false,
              5000
            );
          }
          else {
            this.passwordErrors = [];
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
      });
  }

}
