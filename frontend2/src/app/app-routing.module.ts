import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MainComponent } from './pages/main/main.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:'', component: MainComponent, canActivate: [AuthGuardService]},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path:'product/:id', component: ProductComponent, canActivate: [AuthGuardService]},
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
