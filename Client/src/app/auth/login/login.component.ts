import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GraphqlService } from '../../graphql/graphql.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validationForm: FormGroup;

  constructor(
    private router: Router,
    private apollo: Apollo,
    private toast: Sweetalert2Service,
    private Query: GraphqlService,
    private loading: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validationForm = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.maxLength(25),
        ])
      ),

      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9_-]{4,15}$'),
        ])
      ),
    });
  }

  get email() {
    return this.validationForm.get('email');
  }
  get password() {
    return this.validationForm.get('password');
  }

  onSubmit(f) {
    this.loading.show();
    return this.apollo
      .watchQuery({
        query: this.Query.Login,
        variables: {
          email: f.email,
          password: f.password,
        },
        fetchPolicy: 'network-only',
      })
      .valueChanges.subscribe(
        ({ data }) => {
          this.validationForm.reset();
          this.loading.hide();
          const token: any = data;
          localStorage.setItem('token', token.login.token);
          this.toast.top();
          this.router.navigate(['./todo']);
        },
        (error) => {
          this.loading.hide();
          this.toast.show(error);
          this.router.navigate(['./register']);
        }
      );
  }
}
