// Library imports
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';

// Local imports
import {BookStoreOverviewComponent} from './book-store-overview.component';
import {BookStoreService} from '../../services';
import {of, throwError} from 'rxjs';
import {booksMock} from '../../mocks/books-response';

describe('BookStoreOverviewComponent', () => {
  let component: BookStoreOverviewComponent;
  let bookStoreService: BookStoreService;
  let fixture: ComponentFixture<BookStoreOverviewComponent>;
  const testUrl = 'books/details/';

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
  })));

  it('should retrieve list of books', () => {
    spyOn(bookStoreService, 'getBooks').and.callThrough()
      .and.returnValue(of(booksMock));
    bookStoreService.getBooks().subscribe(result => {
      expect(result[0].id).toEqual('100');
      expect(result[0].title).toEqual('Head First Design Patterns');
    }, err => {
      component.books = null;
      expect(component.books).toBe(null);
    });
    component.getBooks();
    expect(component.books.length).toEqual(2);
  });

  it('should retrieve error ', () => {
    const errorObj = {
      error: {
        errors: [{
          code: '500',
          message: 'Internal server error'
        }]
      }
    };
    spyOn(bookStoreService, 'getBooks').and.callThrough()
      .and.returnValue(throwError(errorObj));
    bookStoreService.getBooks().subscribe(result => {
      expect(result).toBe(null);
    }, err => {
      expect(err).toBe(errorObj);
      expect(err.error.errors[0].code).toBe('500');
    });
    component.getBooks();
  });
});
