import {Component} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    authRequest: AuthenticationRequest = {email: '', password: ''};
    errorMsg: Array<string> = [];

    constructor(
        private router: Router,
        private authService: AuthenticationService) {
    }

    login() {
        this.errorMsg = [];
        this.authService.authenticate({ body: this.authRequest }).subscribe({
            next: (res) => {
                this.router.navigate(['books']);
            },
            error: (error) => {
                if (error.error instanceof Blob) {
                    // Convertir Blob en JSON
                    error.error.text().then((text: string) => {
                        const errorJson = JSON.parse(text);
                        if (errorJson.validationErrors) {
                            this.errorMsg = errorJson.validationErrors;
                        } else {
                            this.errorMsg.push("Une erreur inconnue s'est produite.");
                        }
                    });
                } else {
                    this.errorMsg.push("Une erreur inconnue s'est produite.");
                }
            }
        });
    }


    register() {
        this.router.navigate(['register']);
    }
}
