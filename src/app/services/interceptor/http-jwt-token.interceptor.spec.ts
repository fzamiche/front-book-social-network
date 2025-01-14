import { TestBed } from '@angular/core/testing';

import { HttpJwtTokenInterceptor } from './http-jwt-token.interceptor';

describe('HttpJwtTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpJwtTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpJwtTokenInterceptor = TestBed.inject(HttpJwtTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
