// Library imports
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from "@angular/router";

// Local imports
import {BookStoreOverviewComponent} from './book-store-overview.component';
import {BookStoreService} from "../../services";
import {of, throwError} from "rxjs";
import {bookDetailsMock} from "../book-store-details/book-store-details.component.spec";
import {Book} from "../../interfaces/book";


describe('BookStoreOverviewComponent', () => {
  let component: BookStoreOverviewComponent;
  let bookStoreService: BookStoreService;
  let fixture: ComponentFixture<BookStoreOverviewComponent>;
  const testUrl = 'books/details/'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BookStoreOverviewComponent],
      providers: [BookStoreService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreOverviewComponent);
    bookStoreService = TestBed.inject(BookStoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getBookDetails', async(inject([Router], (router: Router) => {
    const spy = spyOn(router, 'navigateByUrl');
    component.getBookDetails('100');
    const url = spy.calls.first().args[0];
    expect(url).toBe(testUrl + '100');
  })))

  it('should retrieve list of books', () => {
    spyOn(bookStoreService, 'getBooks').and.callThrough()
      .and.returnValue(of(booksMock));
    bookStoreService.getBooks().subscribe(booksMock => {
      expect(component.getBooks).toHaveBeenCalled();
    }, err => {
      component.books = null;
      expect(component.books).toBe(null);
    });
    component.getBooks();
    expect(component.books[0].id).toEqual('100');
  });

  it('should retrieve error ', () => {
    const errorObj = {
      error: {
        errors: [{
          code: '500',
          message: 'Internal server error'
        }]
      }
    }
    spyOn(bookStoreService, 'getBooks').and.callThrough()
      .and.returnValue(throwError(errorObj));
    bookStoreService.getBooks().subscribe(booksMock => {
      expect(component.getBooks).toHaveBeenCalled();
    }, err => {
      expect(err).toBe(errorObj);
      expect(err.error.errors[0].code).toBe('500');
    });
    component.getBooks();
  });


});

export const booksMock: Book[] = [
  {
    id: '100',
    title: 'Head First Design Patterns',
    authors: 'Eric Freeman & Bert Bates & Kathy Sierra',
    publisher: 'O\'REILY',
    publishDate: '2004-10-20',
    description: 'This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software',
    averageRating: '4.5',
    totalPages: 679,
    price: 1150.00
  },
  {
    id: '101',
    title: 'Secrets of the JavaScript Ninja',
    authors: 'John Resig & Bear Bibeault',
    publisher: 'Manning Publications',
    publishDate: '2016-08-15',
    description: 'More than ever, the web is a universal platform for all types of applications, and JavaScript is the language of the web',
    averageRating: '4.2',
    totalPages: 550,
    price: 950.00
  }
];
