//Library imports
import {TestBed} from '@angular/core/testing';
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

//Local imports
import {BookStoreService} from './book-store.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BookStoreOverviewComponent} from "../pages";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('BookStoreService', () => {
  let httpClientSpy: { get: jasmine.Spy }
  let service: BookStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BookStoreOverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(BookStoreService);
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new BookStoreService(httpClientSpy as any);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getBooks', () => {
    const expectedData: any = [{
      id: "string",
      title: "string",
      subtitle: "string",
      authors: [],
      publisher: "string",
      publishDate: "string",
      description: "string",
      averageRating: "number",
      ratingsCount: "number",
      price: "120.00"
    }];
    httpClientSpy.get.and.returnValue(of(expectedData));
    service.getBooks().subscribe(data => {
      expect(data[0].id).toEqual('string');
    });
  });

  it('should throw error', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({error: {message: 'invalid user'}});
    httpClientSpy.get.and.returnValue(of(error));
    service.getBooks().subscribe(err => {
    });
  })

});
