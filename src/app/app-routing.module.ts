import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent  }from './add/add.component';
import { AuthenticateGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    loadChildren: ()=>
      import("../app/login/login.module").then(m=>m.LoginModule)
  },
  {
    path: "home",
    loadChildren: ()=>
      import("../app/home/home.module").then(m=>m.HomeModule),
      canActivate:[AuthenticateGuard]
    
  },
  
  {
    path:"add",
    component: AddComponent,
    canActivate:[AuthenticateGuard]
  },
  {
    path: 'sign-up',
    loadChildren: ()=>
          import("../app/sign-up/sign-up.module").then(m=>m.SignUpModule)
  },
  {
    path: 'edit',
    loadChildren: ()=>
          import("../app/edit/edit.module").then(m=>m.EditModule),
          canActivate:[AuthenticateGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
