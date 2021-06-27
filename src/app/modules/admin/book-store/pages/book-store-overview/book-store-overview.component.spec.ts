import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreOverviewComponent } from './book-store-overview.component';

describe('BookStoreOverviewComponent', () => {
  let component: BookStoreOverviewComponent;
  let fixture: ComponentFixture<BookStoreOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookStoreOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
