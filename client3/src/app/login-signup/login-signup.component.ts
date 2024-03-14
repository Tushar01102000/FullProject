import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login, signup } from '../models/contactmodel';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent implements OnInit, OnDestroy{
  isShow:boolean=false;
  http=inject(HttpClient);
  router=inject(Router);
  toast=inject(NgToastService);
  duplicateUserStatus:boolean=false;

  signupForm:FormGroup;
  loginForm:FormGroup;

  createUser$:Subscription;
  userLogin$: Subscription;

  constructor(private formBuilder:FormBuilder,private apiService:ApiService){}

  ngOnInit():void{
    //userdata should not be stored in local storage
    localStorage.removeItem("loginData");
    localStorage.removeItem("adminLogin");
    //signup
    this.signupForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    //login
    this.loginForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signup(){
    this.isShow=true;
  }

  login(){
    this.isShow=false;
  }

  submitSignup(){
    this.createUser$= this.apiService.createUser(this.signupForm.value).subscribe({
      next:(res)=>{
        //alert("User signedup successfully");
        if(res.message==="User created"){
          this.duplicateUserStatus=false;
          this.toast.success({detail:"Success",summary:'Signup successfull!', position:'topCenter'});
          this.signupForm.reset();
        }else{
          this.duplicateUserStatus=true;
        }

      },
      error:(error)=>{
        this.toast.warning({detail:"Warn",summary:'Signup failed, Try again Later', position:'topCenter'});
      }
    });
  }

  loginUser(){
      this.userLogin$= this.apiService.userLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message==="Login Success"){
            //store token in local storage
            localStorage.setItem("loginData", res.token);
            this.toast.success({detail:"Success",summary:'Successfully logged in!', position:'topCenter'});
            this.loginForm.reset();
            this.apiService.adminCheck.set(false);
            this.router.navigate(["/contactlist"]);
          }else{
           // alert("User not found with these credentials!");
           this.toast.error({detail:"Error",summary:res.message, position:'topCenter'});
           this.loginForm.reset();

          }
        },
        error:(error)=>{
          //alert("Something went wrong!");
          this.toast.warning({detail:"Warn",summary:'Something went wrong, Try again later!', position:'topCenter'});
          this.loginForm.reset();
        }
      })
  }

  ngOnDestroy():void{
    if(this.createUser$){
      this.createUser$.unsubscribe();
    }
    if(this.userLogin$){
      this.userLogin$.unsubscribe();
    }
  }
}
