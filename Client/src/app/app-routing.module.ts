import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { CustomPreloadingService } from './shared/custom-preloading.service';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', redirectTo: 'login', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  { path: 'todo', data: {preload: true, loadAfterSeconds: 5}, loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule) },
  {path:'**',component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
