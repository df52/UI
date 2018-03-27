import { Component, OnDestroy, OnInit, Inject, forwardRef, trigger, state, style, transition, animate, keyframes, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
    selector: 'login',
    templateUrl: '../templates/login.component.html',
    styleUrls: ['../css/register.component.css']
})
export class LoginComponent {

    constructor(private loginService: LoginService, private router: Router, private toasterService: ToasterService,
        private progressBar: SlimLoadingBarService) {
        this.loginPage = true;
    }
    loginPage: boolean = true;
    registerClass: string = "";
    loginClass: string = "active";
    model: any = {};
    user: any = {};

    resetInfo() {
        this.loginPage = true;
        this.registerClass = '';
        this.loginClass = 'active';
        this.model = {};
    }

    userLogin() {
        this.progressBar.start();
        this.loginService.login(this.model)
            .subscribe(
            (response) => {
                this.progressBar.stop();
                this.storeData(response);

                // get userdetails
                let body = JSON.parse(response._body);
                this.loginService.getUserDetails(body.userId)
                    .subscribe(
                    (response) => {
                        this.user = response._body;
                        localStorage.setItem('user', this.user);
                        this.router.navigate(['./app/dashboard']);
                    },
                    (err) => {
                        console.error(err);
                    },
                    () => {
                    }
                    );
                this.toasterService.pop('success', 'Logged in successfully');
            },
            (err) => {
                console.error(err);

            },
            () => {
            }
            );

    }

    checkAndRegisterUser() {
        if (this.model.Password != this.model.ConfirmPassword) {
            this.toasterService.pop('error', '"Password doesnt match.');
        } else {
            this.registerUser()
        }
    }

    registerUser() {

        this.loginService.register(this.model)
            .subscribe(
            (response) => {
                this.resetInfo();
            },
            (err) => {
                console.error(err);
                let body = JSON.parse(err._body)
                if (body.error.statusCode == 422) {
                    this.toasterService.pop('error', 'Email already exist.');
                }
            },
            () => {
            }
            );
    }

    storeData(response) {
        let body = JSON.parse(response._body);
        localStorage.setItem('access_Token', body.id)
    }
}