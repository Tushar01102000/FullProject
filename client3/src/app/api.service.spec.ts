import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { contact } from './models/contactmodel';

describe('ApiService', () => {
  let service: ApiService;
  let controller;

  let listData:contact[]=[
    {
      "firstname": "Saumya",
      "lastname": "Khajuria",
      "phonenumber": 9087654321,
      "city": "Delhi",
    },
    {
      "firstname": "Sai",
      "lastname": "Charan",
      "phonenumber": 9900876543,
      "city": "Hyderabad",
    },
  ]
//configuration for api request test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ApiService]
    });
    service = TestBed.inject(ApiService);
    controller=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    controller.verify();
  })

//to test if api service object is created or not
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //mocking http request

  it('should create contact', ()=>{
    let list:contact| undefined={
      "firstname": "Saumya",
      "lastname": "Khajuria",
      "phonenumber": 9087654321,
      "city": "Delhi",
    };
    service.addContact(list).subscribe((res)=>{
      console.log("res is", res);
    })
    let testReq=controller.expectOne('http://localhost:4000/contact-list-api/contact');
    expect(testReq.request.method).toBe('POST');
    testReq.flush(list);
  })

  it('get contact list', ()=>{
    let list:contact[] | undefined;
    service.getContact().subscribe((res)=>{
      console.log("res is", res);
      list=res;
    })
    let testReq=controller.expectOne('http://localhost:4000/contact-list-api/contacts')
    expect(testReq.request.method).toBe('GET');
    testReq.flush(listData);
    expect(list).toEqual(listData);
  })
});
