// Library imports
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {throwError} from 'rxjs';

// Local imports
import {GlobalErrorInterceptor} from './global-error.interceptor';

describe('GlobalErrorInterceptor', () => {
  let interceptor: GlobalErrorInterceptor;
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [GlobalErrorInterceptor]
    });
    interceptor = TestBed.inject(GlobalErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle the api error', () => {
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['get']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(
      {
        error: {
          error: {
            message: 'test-error'
          }
        }
      }
    ));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
      result => result,
      err => {
        expect(err.error.error.message).toEqual('test-error');
      });
  });
});
