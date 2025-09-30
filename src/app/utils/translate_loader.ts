import { HttpClient } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return provideTranslateHttpLoader({
    prefix: './assets/i18n/',
    suffix: '.json'
  });
}
