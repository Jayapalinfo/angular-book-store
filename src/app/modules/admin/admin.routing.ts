//Library imports
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";

//Local imports
import {BookStoreDetailsComponent, BookStoreLoginComponent, BookStoreOverviewComponent} from "./book-store/pages";
import {AuthGuard} from "./book-store/helpers/auth.guard";
import {AdminComponent} from "./admin.component";

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'login', component: BookStoreLoginComponent},
      {path: 'overview', component: BookStoreOverviewComponent, canActivate: [AuthGuard]},
      {path: 'details', component: BookStoreDetailsComponent, canActivate: [AuthGuard]},
      {path: '', pathMatch: 'prefix', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
