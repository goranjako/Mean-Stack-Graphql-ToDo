import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private toast: Sweetalert2Service, private router: Router) {}

  Login = gql`
    query login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        token
      }
    }
  `;

  CREATE = gql`
    mutation register($fullName: String!, $email: String!, $password: String!) {
      register(
        input: { fullName: $fullName, email: $email, password: $password }
      ) {
        token
      }
    }
  `;
getToken() {
  const token = localStorage.getItem('token');
  const decode = jwt_decode(token);
  return decode;

}
public isLoggedIn() {
  return localStorage.getItem('token') !== null;

}
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  this.toast.logaut();
  this.router.navigate(['/login']);
}

}

