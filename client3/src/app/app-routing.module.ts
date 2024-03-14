import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AdminLoginSignupComponent } from './admin-login-signup/admin-login-signup.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { adminauthGuard } from './adminauth.guard';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { userauthGuard } from './userauth.guard';

const routes: Routes = [
  {path:'contactlist', component:ContactListComponent, canActivate:[userauthGuard]},
  {path:'addcontact', component:AddContactComponent, canActivate:[userauthGuard]},
  {path:'updatecontact/:id', component:UpdateContactComponent, canActivate:[userauthGuard]},
  {path:'admin-login-signup', component: AdminLoginSignupComponent},
  {path:'login-signup', component:LoginSignupComponent},
  {path:'admin-view', component:AdminViewComponent, canActivate:[adminauthGuard]},
  {path: '', redirectTo:'login-signup', pathMatch:'full'},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
