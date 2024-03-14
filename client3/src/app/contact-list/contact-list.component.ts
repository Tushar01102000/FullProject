import { Component,inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../api.service';
import { adminLogin, contact, contactUs } from '../models/contactmodel';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  
  api=inject(ApiService);
  toast=inject(NgToastService);
  adminCheck=this.api.adminCheck;
  data:contact[] | any;
  searchText:any;

  contactUsForm:FormGroup;

  getContact$:Subscription;
  deleteContact$:Subscription;
  contactUs$:Subscription;

  constructor(private formBuilder:FormBuilder){
    if(localStorage.getItem('adminLogin')){
      this.adminCheck.set(true);
    }else{
      this.adminCheck.set(false);
    }
  }

  ngOnInit(): void {
     this.getContact();
    //console.log(this.api.adminCheck());
    this.contactUsForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  getContact(){
    this.getContact$= this.api.getContact().subscribe({
      next:(res)=>{
        if(res.message==="show contactList"){
          this.data=res.payload;
        }
      }
    })
  }

  deleteContact(id){
      // if(!this.api.adminCheck()) return;

   this.deleteContact$= this.api.deleteContact(id).subscribe({
      next: (res)=>{
        if(res.message==="Contact deleted"){
          this.toast.success({detail:"Success",summary:'Contact deleted successfully!', position:'topCenter'});
          this.getContact();
        }
      },
      error: (error)=>{
        this.toast.error({detail:"Error",summary:'Deletion Failed, Try again later!', position:'topCenter'})
      }
    })
  }

  logout(){
    localStorage.removeItem("loginData");
    localStorage.removeItem("adminLogin");
  }

  contactUsSubmit(data){
    this.contactUs$= this.api.contactUs(data).subscribe({
      next:(res)=>{
        if(res.message==="Query made"){
          this.toast.success({detail:"Success",summary:'Query submitted successfully!', position:'topCenter'});
          this.contactUsForm.reset();
        }else{
          this.toast.error({detail:"Error",summary:res.message, position:'topCenter'});
          this.contactUsForm.reset();
        } 
      },
      error:(error)=>{
        this.toast.warning({detail:"WARN",summary:'Something went wrong, Please try again later!', position:'topCenter'});
        this.contactUsForm.reset(); 
      }
    })
  }

  ngOnDestroy():void{
    if(this.getContact$){
      this.getContact$.unsubscribe();
    }
    if(this.deleteContact$){
      this.deleteContact$.unsubscribe();
    }
    if(this.contactUs$){
      this.contactUs$.unsubscribe();
    }
  }
}
