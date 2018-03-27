import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { LoginModule } from './login/login.module';
import { CategoryModule } from './category/category.module'
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    Routing,
    LoginModule,
    CategoryModule,
    AuthenticateModule
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private toasterService: ToasterService) {
    this.toasterService = toasterService;
  };

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: false,
    positionClass: 'toast-top-right'
  });
}
