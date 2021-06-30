// Library imports
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// Local imports
import {AuthenticationService} from './authentication.service';
import {of} from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login success', () => {
    const user: any = {
      id: 100,
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'Admin'
    };
    httpClientSpy.post.and.returnValue(of(user));
    service.login('admin', 'admin').subscribe(data => {
      console.log('data', data.userName);
      expect(data.userName).toEqual('admin');
    });
  });

  it('should login failed', () => {
    const user: any = {
      id: 100,
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'Admin'
    };
    httpClientSpy.post.and.returnValue(of(user));
    service.login('admin123', 'admin').subscribe(err => {
    });
  });

  it('should call the logout', () => {
    service.logout();
    expect(service.currentUserValue).toEqual(null);
  });

});
