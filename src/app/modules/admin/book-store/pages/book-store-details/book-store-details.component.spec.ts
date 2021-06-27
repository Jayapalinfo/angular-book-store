import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreDetailsComponent } from './book-store-details.component';

describe('BookStoreDetailsComponent', () => {
  let component: BookStoreDetailsComponent;
  let fixture: ComponentFixture<BookStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookStoreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
