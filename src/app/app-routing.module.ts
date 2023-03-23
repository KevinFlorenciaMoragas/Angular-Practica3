import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { IndexComponent } from './component/index/index.component';
import { PrincipalComponent } from './component/principal/principal.component';
const routes: Routes = [
  {path: '', component:PrincipalComponent},
  {path: 'index', component: IndexComponent},
  {path: 'form', component: FormComponent},
  {path: 'principal', component: PrincipalComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
