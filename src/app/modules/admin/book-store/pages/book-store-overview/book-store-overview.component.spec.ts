import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { BookStoreOverviewComponent } from './book-store-overview.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NavigationComponent} from "../../../../../navigation/navigation.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('BookStoreOverviewComponent', () => {
  let component: BookStoreOverviewComponent;
  let fixture: ComponentFixture<BookStoreOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ BookStoreOverviewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
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
