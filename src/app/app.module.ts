// Library imports
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';

// Local imports
import {SharedModule} from './modules/shared/shared.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {NavigationComponent} from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule.forRoot()
  ],
  providers: [{
    provide: LocationStrategy, useClass: PathLocationStrategy
  }, {
    provide: APP_BASE_HREF, useValue: '/'
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
