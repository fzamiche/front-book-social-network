import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() {
  }

  set jwtToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }

  get jwtToken(): string {
    return localStorage.getItem('jwt-token') as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const jwtToken = this.jwtToken;
    if (!jwtToken) {
      return false;
    }
    // decode jwt token and check if it is expired
    // install jwt-decode package
    const jwtHelper = new JwtHelperService();
    //check expiration date
    const isJwtTokenExpired = jwtHelper.isTokenExpired(jwtToken);
    if (isJwtTokenExpired) {
      localStorage.removeItem('jwt-token');
      return false;
    }
    return true;
  }
}
