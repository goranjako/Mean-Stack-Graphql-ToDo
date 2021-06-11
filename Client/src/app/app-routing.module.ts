import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
 
  {path:'register', component: RegisterComponent},
  { path: 'todo', loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
  data:{ preload: true}},
  
  {path:'**',component: NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: QuicklinkStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
