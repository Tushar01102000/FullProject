import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api.service';

import { UpdateContactComponent } from './update-contact.component';

describe('UpdateContactComponent', () => {
  let component: UpdateContactComponent;
  let fixture: ComponentFixture<UpdateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [UpdateContactComponent],
      providers: [ApiService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
