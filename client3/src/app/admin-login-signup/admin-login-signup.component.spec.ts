import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api.service';

import { AdminLoginSignupComponent } from './admin-login-signup.component';

describe('AdminLoginSignupComponent', () => {
  let component: AdminLoginSignupComponent;
  let fixture: ComponentFixture<AdminLoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [AdminLoginSignupComponent],
      providers: [ApiService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
