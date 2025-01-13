import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = false; // account activation status
  submitted: boolean = false; // activation code submission status

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onCodeCompleted(codeActivation: string) {
    this.authService.activateAccount({
      token: codeActivation
    }).subscribe({
        next: () => {
          this.message = 'Account activated successfully\nNow you can login';
          this.submitted = true;
          this.isOkay = true;
        },
        error: () => {
          this.message = 'Activation code has been expired or invalid\n';
          this.submitted = true;
          this.isOkay = false;
        }
      })
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
