import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import gql from 'graphql-tag';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private toast: Sweetalert2Service,private spiner: NgxSpinnerService, private router: Router) {}

  Login = gql`
    query login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        token
      }
    }
  `;

  Create = gql`
    mutation register($fullName: String!, $email: String!, $password: String!) {
      register(
        input: { fullName: $fullName, email: $email, password: $password }
      ) {
        token
      }
    }
  `;

todo = gql`
query todo($userId:String!){
todo(userId: $userId)
{
item,
isCompleted
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
  this.router.navigate(['login']);
  this.spiner.hide();
}

errorHandl(error) {
  let errorMessage = '';
  if (error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

}

