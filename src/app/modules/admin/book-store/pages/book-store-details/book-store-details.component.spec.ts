import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStoreDetailsComponent } from './book-store-details.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BookStoreDetailsComponent', () => {
  let component: BookStoreDetailsComponent;
  let fixture: ComponentFixture<BookStoreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ BookStoreDetailsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
