import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { Apollo } from 'apollo-angular';
import {GraphqlService} from '../../graphql/graphql.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  validationForm: FormGroup;

 constructor(private router: Router, private toast: Sweetalert2Service, private loading: NgxSpinnerService,
  private apollo: Apollo, private Query: GraphqlService
      ) {
    }

      ngOnInit() {
        this.validationForm = new FormGroup({
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
            Validators.maxLength(25)
          ])),
            fullName: new FormControl('', Validators.compose([
            Validators.required
          ])),
          password: new FormControl('',  Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25)
          ]))
        });
       }
      get fullName() { return this.validationForm.get('fullName'); }
      get email() { return this.validationForm.get('email'); }
      get password() { return this.validationForm.get('password'); }

  onSubmit(f) {
    this.loading.show(),
    this.apollo
    .mutate({
      mutation: this.Query.Create,
      variables: {
        fullName: f.fullName,
        email: f.email,
        password: f.password,
      },
    })
    .subscribe(
      ({ data }) => {
        this.validationForm.reset();
        this.loading.hide();
        const token: any = data;
        localStorage.setItem('token', token.register.token);
        this.toast.top();
        this.router.navigate(['/todo']);
      },
      (error) => {
        this.loading.hide();
        this.toast.show(error);
      }
    );
}
}




