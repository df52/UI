import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthenticateService } from './service/authenticate.service';
import { LogoutCheckService } from './service/logout-check.service';

@NgModule({

    imports: [CommonModule, RouterModule],
    providers: [AuthenticateService, LogoutCheckService]

})
export class AuthenticateModule {

}

export * from './service/authenticate.service';
export * from './service/logout-check.service';