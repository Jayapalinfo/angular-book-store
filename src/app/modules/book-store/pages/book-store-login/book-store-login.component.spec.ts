import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreLoginComponent } from './book-store-login.component';

describe('BookStoreLoginComponent', () => {
  let component: BookStoreLoginComponent;
  let fixture: ComponentFixture<BookStoreLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookStoreLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
