import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { contact } from '../models/contactmodel';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent implements OnInit, OnDestroy{
  contactId:any;
  contactData:contact={};

  api=inject(ApiService);
  route=inject(Router);
  activatedRoute=inject(ActivatedRoute);
  toast=inject(NgToastService);

  activatedRoute$:Subscription;
  fetchData$:Subscription;
  updateContact$: Subscription;

  ngOnInit(): void {
    this.activatedRoute$= this.activatedRoute.params.subscribe({
      next:(params:Params)=>{
        this.contactId=params['id'];
      }
    })
    this.fetchData$= this.api.fetchData(this.contactId).subscribe({
      next:(res:any)=>{
        if(res.message==="show contact"){
          this.contactData=res.payload;
        }
        //console.log(data);
      }
    })
  }

  updateContact(){
    this.updateContact$= this.api.updateContact(this.contactData, this.contactId).subscribe({
      next:(res:any)=>{
        if(res.message==="Contact updated"){
          this.toast.success({detail:"Success",summary:'Data updated successfully!', position:'topCenter'});
          this.route.navigate(['/contactlist']);
        }else{
          this.toast.error({detail:"Error",summary:res.message, position:'topCenter'});
        }
      },
      error:(error)=>{
        this.toast.warning({detail:"Warn",summary:'Updation failed, Try again later!', position:'topCenter'});
      }
    })
  }

  ngOnDestroy():void{
    if(this.activatedRoute$){
      this.activatedRoute$.unsubscribe();
    }
    if(this.fetchData$){
      this.fetchData$.unsubscribe();
    }
    if(this.updateContact$){
      this.updateContact$.unsubscribe();
    }
  }
}
