// Library imports
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// Local imports
import {BookStoreDetailsComponent} from './book-store-details.component';
import {BookStoreService} from "../../services";
import {of, throwError} from "rxjs";
import {Book} from "../../interfaces/book";

describe('BookStoreDetailsComponent', () => {
  let component: BookStoreDetailsComponent;
  let bookStoreService: BookStoreService;
  let fixture: ComponentFixture<BookStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BookStoreDetailsComponent],
      providers: [BookStoreService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreDetailsComponent);
    component = fixture.componentInstance;
    bookStoreService = TestBed.inject(BookStoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getBookDetails').and.callThrough();
    component.ngOnInit();
    expect(component.getBookDetails).toHaveBeenCalled();
  });

  it('should retrieve data form get books ', () => {
    spyOn(bookStoreService, 'getBookDetails').and.callThrough()
      .and.returnValue(of(bookDetailsMock));
    bookStoreService.getBookDetails('100').subscribe(bookDetailsMock => {
      expect(component.getBookDetails).toHaveBeenCalled();
    }, err => {
      //component.book = null;
      expect(component.book).toBe(null);
    });
    component.getBookDetails('100');
    expect(component.book.id).toEqual('100');
  });

  it('should retrieve error ', () => {
    const errorObj = {
      error: {
        errors:[{
          code: '500',
          message: 'Internal server error'
        }]
      }
    }
    spyOn(bookStoreService, 'getBookDetails').and.callThrough()
      .and.returnValue(throwError(errorObj));
    bookStoreService.getBookDetails('100').subscribe(bookDetailsMock => {
      expect(component.getBookDetails).toHaveBeenCalled();
    }, err => {
      expect(err).toBe(errorObj);
      expect(err.error.errors[0].code).toBe('500');
    });
    component.getBookDetails('100');
  });


});

export const bookDetailsMock: Book = {
  id: '100',
  title: 'Head First Design Patterns',
  authors: 'Eric Freeman & Bert Bates & Kathy Sierra',
  publisher: 'O\'REILY',
  publishDate: '2004-10-20',
  description: 'This edition of Head First Design Patterns—now updated for Java 8—shows you the tried-and-true, road-tested patterns used by developers to create functional, elegant, reusable, and flexible software',
  averageRating: '4.5',
  totalPages: 679,
  price: 1150.00
}
