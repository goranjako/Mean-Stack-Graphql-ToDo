import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { NavbarComponent } from './index/navbar/navbar.component';
import { NotFoundComponent } from './index/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MDBBootstrapModule.forRoot(), HttpClientModule,GraphQLModule,BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    NgxSpinnerModule,SweetAlert2Module,JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
