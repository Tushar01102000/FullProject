import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


export const userauthGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const toast=inject(NgToastService);

  if(localStorage.getItem("loginData") || localStorage.getItem("adminLogin")){
    return true;
  }else{
    router.navigate(["/"]);
    toast.error({detail:"Error",summary:"Unauthorized Access", position:'topCenter'});
    return false;
  }

};



