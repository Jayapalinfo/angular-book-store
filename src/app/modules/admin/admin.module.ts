//Library imports
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

//Local imports
import {AdminComponent} from "./admin.component";
import {BookStoreLoginComponent, BookStoreOverviewComponent, BookStoreDetailsComponent} from "./book-store/pages";
import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin.routing";

@NgModule({
  declarations: [
    AdminComponent,
    BookStoreOverviewComponent,
    BookStoreDetailsComponent,
    BookStoreLoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'en-EN'
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
