import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthenticateService implements CanActivate, CanActivateChild {

    constructor(private router: Router) {

    }

    canActivate() {
        if (localStorage.getItem("access_Token") !== null) {
            return true;
        }
        this.router.navigate(['/public/login']);
        return false;
    }

    canActivateChild() {
        return this.canActivate();
    }

}
