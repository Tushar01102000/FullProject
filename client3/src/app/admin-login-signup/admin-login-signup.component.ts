import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import {adminSignup} from '../models/contactmodel';

@Component({
  selector: 'app-admin-login-signup',
  templateUrl: './admin-login-signup.component.html',
  styleUrl: './admin-login-signup.component.css'
})
export class AdminLoginSignupComponent implements OnInit, OnDestroy{

  http=inject(HttpClient);
  router=inject(Router);
  toast=inject(NgToastService);

  adminLoginForm:FormGroup;

  adminLogin$:Subscription;
 
  constructor(private formBuilder:FormBuilder,private apiService:ApiService){}

  ngOnInit(): void {
    localStorage.removeItem("adminLogin");
    this.adminLoginForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  adminLogin(){
    this.adminLogin$= this.apiService.adminLogin(this.adminLoginForm.value).subscribe({
      next:(res)=>{
        if(res.message==="Admin Login Success"){
           //storing data on local storage
           localStorage.setItem('adminLogin', res.token);
           this.toast.success({detail:"Success",summary:'Successfully login!', position:'topCenter'});
          // this.router.navigate(['/contactlist']);
          this.adminLoginForm.reset();
          this.apiService.adminCheck.set(true);
          this.router.navigate(['/contactlist']);
        }else{
          this.toast.error({detail:"Error",summary:res.message, position:'topCenter'});
          this.adminLoginForm.reset();
        }
      },
      error:(error)=>{
        this.toast.warning({detail:"WARN",summary:'Something went wrong, Please try again later!', position:'topCenter'});
        this.adminLoginForm.reset(); 
      }
    })
  }

  ngOnDestroy():void{
    if(this.adminLogin$){
      this.adminLogin$.unsubscribe();
    }
  }
}
