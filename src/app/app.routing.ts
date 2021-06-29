// Library imports
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const routers: Routes = [
  {path: 'app/admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: '', pathMatch: 'prefix', redirectTo: 'app/admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
