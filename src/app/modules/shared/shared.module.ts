import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {NotificationComponent} from "./components";
import {AuthenticationService, NotificationService} from "./services";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {GlobalErrorInterceptor} from "./interceptors";
import {CommonModule} from "@angular/common";

const componentList = [
  NotificationComponent
];

@NgModule({
  declarations: componentList,
  imports: [
    CommonModule
  ],
  exports: componentList,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService,
        AuthenticationService,
        {provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true}
      ]
    }
  }
}
