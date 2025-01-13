import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtTokenService} from "../jwt-token-service/jwt-token.service";

@Injectable()
export class HttpJwtTokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: JwtTokenService
  ) {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.tokenService.jwtToken;
    if (jwtToken) {
      const authRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`
        })
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
