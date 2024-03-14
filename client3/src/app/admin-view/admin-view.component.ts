import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { contactUs } from '../models/contactmodel';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit, OnDestroy {
  data:contactUs[]| any;
  api=inject(ApiService);
  toast=inject(NgToastService);

  displayContactUs$:Subscription;
  deleteQuery$:Subscription;
  
  ngOnInit(): void {
    this.showContactUs();
  }

  showContactUs(){
   this.displayContactUs$= this.api.displayContactUs().subscribe({
      next:(res)=>{
        if(res.message==="Query List"){
          this.data=res.payload;
        }
      }
    })
  }

  delete(id){
    this.deleteQuery$= this.api.deleteQuery(id).subscribe({
      next:(res)=>{
        if(res.message==="Query deleted"){
          this.toast.success({detail:"Success",summary:'Contact query deleted successfully!', position:'topCenter'});
          this.showContactUs();
        }
      },
      error: (error)=>{
        this.toast.error({detail:"Error",summary:'Deletion Failed, Try again later!', position:'topCenter'})
      }
    })
  }

  logout(){
    localStorage.removeItem("adminLogin");
  }

  ngOnDestroy():void{
    if(this.displayContactUs$){
      this.displayContactUs$.unsubscribe();
    }
    if(this.deleteQuery$){
      this.deleteQuery$.unsubscribe();
    }
  }
}
