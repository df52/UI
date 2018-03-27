import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';

@Injectable()
export class LogoutCheckService implements CanActivate, CanActivateChild {

    constructor(private router: Router) {

    }

    canActivate() {
        if (localStorage.getItem("access_Token")) {

            this.router.navigate(['./app/dashboard']);
        }
        return true;


    }

    canActivateChild() {
        return this.canActivate();
    }

}
