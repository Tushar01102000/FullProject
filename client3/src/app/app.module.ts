import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './filter.pipe';
import { NgToastModule } from 'ng-angular-popup';    //for alert popup messages
import { AdminLoginSignupComponent } from './admin-login-signup/admin-login-signup.component';
import { AdminViewComponent } from './admin-view/admin-view.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddContactComponent,
    UpdateContactComponent,
    LoginSignupComponent,
    PageNotFoundComponent,
    FilterPipe,
    AdminLoginSignupComponent,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgToastModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
