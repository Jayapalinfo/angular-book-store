// Library imports
import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse} from '@angular/common/http';

// Library imports
import {GlobalErrorService} from './global-error.service';

describe('GlobalErrorService', () => {
  let service: GlobalErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorService]
    });
    service = TestBed.inject(GlobalErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should handle server general error response', () => {
    const errorResponse = new HttpErrorResponse({
      error: {
        errors: [{ message: 'Internal server error' }]
      }
    });
    const handleErrorRes = [{ type: 'error', messages: [{ message: 'Internal server error' }] }];
    service.handleError(errorResponse);
    service.errorObservable.subscribe(err => {
      expect(err.error.errors).toEqual(handleErrorRes);
    });
  });

  it('should clear the error response', () => {
    service.clearError();
    service.errorObservable.subscribe(err => {
      expect(err).toEqual(null);
    });
  });

});
