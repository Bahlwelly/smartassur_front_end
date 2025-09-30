import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('smartassure');

  currentLang = localStorage.getItem ('userLang');
  private translate = inject(TranslateService);

  ngOnInit () {
    this.translate.use(this.currentLang ? this.currentLang : 'en');
    if (this.currentLang === 'ar') {
      document.body.setAttribute('dir', 'rtl');
    }
    else {
      document.body.setAttribute('dir', 'ltr');
    }
  }


}
