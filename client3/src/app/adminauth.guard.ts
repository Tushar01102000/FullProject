import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const toast=inject(NgToastService);
  if(localStorage.getItem('adminLogin')){
    return true;
  }else{
    router.navigate(['./admin-login-signup']);
    toast.error({detail:"Error",summary:"Unauthorized Access", position:'topCenter'});
    return false;
  }
};
