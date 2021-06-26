import { Routes, RouterModule } from '@angular/router';

import {BookStoreLoginComponent} from "./modules/book-store/pages/book-store-login/book-store-login.component";
import {AuthGuard} from "./modules/book-store/helpers/auth.guard";
import {BookStoreOverviewComponent} from "./modules/book-store/pages/book-store-overview/book-store-overview.component";

const routes: Routes = [
  { path: '', component: BookStoreOverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: BookStoreLoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
