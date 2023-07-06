import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'contactmanager',
    loadChildren: () => import('./contactmanager/contactmanager.module').then(mod => mod.ContactmanagerModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then(mod => mod.DemoModule)
  },
  {path: '**', redirectTo: 'contactmanager'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
