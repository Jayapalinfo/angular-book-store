import { TestBed } from '@angular/core/testing';

import { GlobalErrorInterceptor } from './global-error.interceptor.ts';

describe('GlobalErrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalErrorInterceptor = TestBed.get(GlobalErrorInterceptor);
    expect(service).toBeTruthy();
  });
});
