import {CanActivateFn, Router} from '@angular/router';
import {JwtTokenService} from "../jwt-token-service/jwt-token.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const jwtTokenService: JwtTokenService = inject(JwtTokenService);
  const router: Router = inject(Router);
  if(jwtTokenService.isTokenNotValid()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
