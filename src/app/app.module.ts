import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BookStoreOverviewComponent} from "./modules/book-store/pages/book-store-overview/book-store-overview.component";
import {BookStoreDetailsComponent} from "./modules/book-store/pages/book-store-details/book-store-details.component";
import {BookStoreLoginComponent} from "./modules/book-store/pages/book-store-login/book-store-login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {appRoutingModule} from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    BookStoreOverviewComponent,
    BookStoreDetailsComponent,
    BookStoreLoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
