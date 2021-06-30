// Library imports
import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CommonModule} from '@angular/common';

// Local imports
import {GlobalErrorInterceptor} from './interceptors';
import {NotificationComponent} from './components';
import {AuthenticationService, NotificationService} from './services';
import {GlobalErrorService} from './services/global-error.service';

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
        GlobalErrorService,
        {provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true}
      ]
    };
  }
}
