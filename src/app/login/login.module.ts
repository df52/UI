import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule, BrowserXhr } from '@angular/http';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { LoginComponent } from './components/login.component';
import {LoginService} from './services/login.service';

import { LoginRouting } from './login.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, HttpModule, JsonpModule, LoginRouting,SlimLoadingBarModule],
    declarations: [LoginComponent],
    providers: [LoginService],
    exports: [LoginComponent]
})
export class LoginModule { }

// export * from './components/login.component';
// export * from './components/register.component';
