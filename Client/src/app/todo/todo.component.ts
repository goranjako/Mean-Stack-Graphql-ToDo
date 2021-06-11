import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Todo } from './todo';
import { GraphqlService } from '../graphql/graphql.service';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  userId;
  checked;
  isCompleted;
items;
  todoForm: FormGroup;
  getQuery: QueryRef<any>;

  constructor( private router: Router,
    private apollo: Apollo,
    private toast: Sweetalert2Service,
    private Query: GraphqlService,
    private loading: NgxSpinnerService) {
      this.userId = this.Query.getToken();

  }

  ngOnInit() {


    this.getTodo();
    this.completed();
    this.todoForm = new FormGroup({
      item: new FormControl('', Validators.compose([
        Validators.required

      ])),
    });

  }
  get item() { return this.todoForm.get('item'); }



  getTodo() {
   this.loading.show();
 this.getQuery= this.apollo
    .watchQuery({
      query: this.Query.todo,
      variables:{
        userId: this.userId.user._id
      },
      fetchPolicy: 'network-only'
    });
    this.items = this.getQuery.valueChanges
      .pipe(map((result) => result.data.todo));
    };






removeItem(s) {}
completed() {
  console.log(this.items)
}
onSubmit(g){}
  }
  /*

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

  completed(c) {
    this.isCompleted = !c.isCompleted;
    this.loading.show();
    const data = {item: c.item, id: c.id, isCompleted: this.isCompleted};
    this.todos.updateTodo(c._id, data).subscribe(
      res => {
        this.toast.show('success', res.msg);
        this.loading.hide();
        this.getTodo();
      },
      err => {
        this.toast.show('warning', err.error.msg);
        this.loading.hide();
      }
    );
  }

  removeItem(s) {
    this.loading.show();
    this.todos.deleteTodo(s._id).subscribe(
      res => {
        this.toast.show('success', res.msg);
        this.loading.hide();
        this.getTodo();
      },
      err => {
        this.toast.show('warning', err.error.msg);
        this.loading.hide();
      }
    );

  }

}

*/
