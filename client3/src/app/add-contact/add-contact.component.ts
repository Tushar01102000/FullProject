import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { contact } from '../models/contactmodel';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnInit, OnDestroy{
  contactForm:FormGroup;
  router=inject(Router);
  api=inject(ApiService);
  toast=inject(NgToastService);

  constructor(private formBuilder:FormBuilder){}

  addContact$:Subscription;

  ngOnInit(): void {
    this.contactForm=this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  submitContact(data:contact){
    //console.log(this.contactForm.value);
    this.api.addContact(data).subscribe({
      next:(res)=>{
        if(res.message==="Contact added"){
          this.contactForm.reset();
          this.router.navigate(["/contactlist"]);
        }else{
          this.toast.error({detail:"Error",summary:res.message, position:'topCenter'});
          this.contactForm.reset();
        } 
      },
      error:(error)=>{
        this.toast.warning({detail:"WARN",summary:'Something went wrong, Please try again later!', position:'topCenter'});
        this.contactForm.reset(); 
      }
  })
    
  }

  ngOnDestroy():void{
    if(this.addContact$){
      this.addContact$.unsubscribe();
    }
  }
}
