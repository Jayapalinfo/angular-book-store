// Library imports
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

// Local imports
import {BookStoreLoginComponent} from './book-store-login.component';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService, NotificationService} from '../../../../shared/services';
import {of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {userMock} from '../../mocks/user-response';

describe('BookStoreLoginComponent', () => {
  let component: BookStoreLoginComponent;
  let fixture: ComponentFixture<BookStoreLoginComponent>;
  let authenticationService: AuthenticationService;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule,
        ReactiveFormsModule, RouterTestingModule.withRoutes([
          {path: 'books/overview', component: BookStoreLoginComponent}
        ])],
      declarations: [BookStoreLoginComponent],
      providers: [AuthenticationService, NotificationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStoreLoginComponent);
    authenticationService = TestBed.inject(AuthenticationService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Login');
  });

  it('should submit the user login details', () => {
    component.loginForm.controls['username'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    component.loginForm.controls.username.setValue('admin');
    component.loginForm.controls.password.setValue('admin');
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'onClickSubmit').and.callThrough();
    spyOn(authenticationService, 'login').and.callThrough()
      .and.returnValue(of(userMock));
    component.onClickSubmit();
    expect(component.onClickSubmit).toHaveBeenCalled();
  });

  it('should handle the user invalid login ', () => {
    component.loginForm.controls['username'].markAsTouched();
    component.loginForm.controls['password'].markAsTouched();
    component.loginForm.controls.username.setValue('admin123');
    component.loginForm.controls.password.setValue('admin123');
    const errorObj = {
      error: {
        errors: [{
          code: '401',
          message: 'Username or password is incorrect'
        }]
      }
    };
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authenticationService, 'login').and.callThrough()
      .and.returnValue(throwError(errorObj));
    component.onClickSubmit();
  });
});
