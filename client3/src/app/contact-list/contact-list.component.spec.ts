import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiService } from '../api.service';
import { FilterPipe } from '../filter.pipe';
import { contact } from '../models/contactmodel';
import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ContactListComponent, FilterPipe],
      providers: [ApiService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty name, email and message', () => {
    expect(component.contactUsForm.value).toEqual({
      name: '',
      email: '',
      message: ''
    });
  });

});
