// Library imports
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// Local imports
import {BookStoreDetailsComponent} from './book-store-details.component';
import {BookStoreService} from '../../services';
import {of, throwError} from 'rxjs';
import {bookDetailsMock} from '../../mocks/book-details-response';

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
    bookStoreService.getBookDetails('100').subscribe(result => {
      expect(result.id).toEqual('100');
      expect(result.title).toEqual('Head First Design Patterns');
    }, err => {
      component.book = null;
      expect(component.book).toBe(null);
    });
    component.getBookDetails('100');
    expect(component.book.id).toEqual('100');
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
    spyOn(bookStoreService, 'getBookDetails').and.callThrough()
      .and.returnValue(throwError(errorObj));
    bookStoreService.getBookDetails('100').subscribe(result => {
      expect(result.id).toBe(null);
    }, err => {
      expect(err).toBe(errorObj);
      expect(err.error.errors[0].code).toBe('500');
    });
    component.getBookDetails('100');
  });
});
