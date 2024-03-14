import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { contact, contactUs, signup } from './models/contactmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    //admin signal
  adminCheck=signal(true);

  http=inject(HttpClient);

  constructor() { }

    //create user(User registration)
    createUser(newUser: signup): Observable<any> {
      return this.http.post('http://localhost:4000/user-api/user', newUser);
    }

    //user login
  userLogin(userCredObj): Observable<any> {
    return this.http.post('http://localhost:4000/user-api/login',userCredObj);
  }

   //admin login
   adminLogin(adminCredObj): Observable<any> {
    return this.http.post('http://localhost:4000/admin-api/login',adminCredObj);
  }

  //post method
  addContact(data:contact):Observable<any>{
    return this.http.post<contact>("http://localhost:4000/contact-list-api/contact", data, 
    {
      headers: {
        authorization: localStorage.getItem('adminLogin') || localStorage.getItem('loginData')
            }
     }
     );
  }

  //get method
  getContact():Observable<any>{
    return this.http.get<contact[]>("http://localhost:4000/contact-list-api/contacts",
    {
      headers: {
        authorization: localStorage.getItem('adminLogin') || localStorage.getItem('loginData')
            }
     }
    );
  }

  //delete method
  deleteContact(id):Observable<any>{
    return this.http.delete<contact>("http://localhost:4000/contact-list-api/deletecontact/"+id, 
    {
      headers: {
        authorization: localStorage.getItem('adminLogin')
            }
     }
    );
  }

  //fetching data on edit
  fetchData(id):Observable<any>{
    return this.http.get<contact>("http://localhost:4000/contact-list-api/contact/"+id,
    {
      headers: {
        authorization: localStorage.getItem('adminLogin') || localStorage.getItem('loginData')
            }
     }
    );
  }

  //update method
  updateContact(data,id):Observable<any>{
    return this.http.put<contact>("http://localhost:4000/contact-list-api/updatecontact/"+id, data,
    {
      headers: {
        authorization: localStorage.getItem('adminLogin') || localStorage.getItem('loginData')
            }
     }
    );
  }

  //add contactus
  contactUs(data:contactUs):Observable<any>{
    return this.http.post<contactUs>("http://localhost:4000/contactus-api/contactUs", data,
    {
      headers: {
        authorization: localStorage.getItem('loginData')
            }
     }
    );
  }

  //get contactus
  displayContactUs():Observable<any>{
    return this.http.get<contactUs[]>("http://localhost:4000/contactus-api/contactUsList",
    {
      headers: {
        authorization: localStorage.getItem('adminLogin')
            }
     }
    )
  }

  //deleteQuery for admin
  deleteQuery(id):Observable<any>{
    return this.http.delete<contactUs>("http://localhost:4000/contactus-api/deleteContactUs/"+id, 
    {
      headers: {
        authorization: localStorage.getItem('adminLogin')
            }
     }
    );
  }

}