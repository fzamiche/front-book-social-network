import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  set jwtToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }

  get jwtToken(): string {
    return localStorage.getItem('jwt-token') as string;
  }
}
