import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rm_token = localStorage.getItem('access_token');
  const fm_token = sessionStorage.getItem('access_token');

  if ((fm_token && !isTokenExpired(fm_token)) || rm_token) {
    return true;
  }


  return router.navigate(['/']);
};

function isTokenExpired (token : string) : boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }
  catch (error) {
    return true;
  }
}
