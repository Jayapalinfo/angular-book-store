// Library imports
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// Local imports
import {BookStoreService} from './book-store.service';
import {BookStoreOverviewComponent} from '../pages';

describe('BookStoreService', () => {
  let httpClientSpy: { get: jasmine.Spy };
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getBooks', () => {
    const expectedData: any = [{
      id: '100',
      title: 'Head First Design Patterns',
      authors: 'Eric Freeman & Bert Bates & Kathy Sierra',
      publisher: 'O\'REILY',
      publishDate: '2004-10-20',
      description: 'This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software',
      averageRating: '4.5',
      totalPages: '679',
      price: '1150.00'
    }];
    httpClientSpy.get.and.returnValue(of(expectedData));
    service.getBooks().subscribe(data => {
      expect(data[0].id).toEqual('100');
    });
  });

  it('should throw error', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({error: {message: 'invalid user'}});
    httpClientSpy.get.and.returnValue(of(error));
    service.getBooks().subscribe(err => {
    });
  });

});
