import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss'
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);
  currentLang = localStorage.getItem('userLang');

  useLang (event : Event) {
    const lang = (event.target as HTMLSelectElement).value;

    localStorage.setItem('userLang', lang);
    this.translate.use(lang);
    location.reload();
  }
}
