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


  }

  ngOnInit() {

    this.todoForm = new FormGroup({
      item: new FormControl('', Validators.compose([
        Validators.required

      ])),
    });
    this.getToken();
    this.getTodo();

  }
  get item() { return this.todoForm.get('item'); }

  getToken(){
    return this.userId = this.Query.getToken();
   }

  onSubmit(f){
    if (this.todoForm.invalid) {
      return;
    }

    this.loading.show();
    this.getToken();
    this.apollo
    .mutate({
      mutation: this.Query.addTodo,
      variables: {
        item: f.item,
        userId: this.userId.user._id,
        isCompleted: false
      },

    })
    .subscribe(
      ({ data }) => {
        this.loading.hide();
        this.todoForm.reset();
        const message: any = data;
        this.toast.top(message.addTodo.message);
        this.getTodo();
        window.location.reload();
      },
      (error) => {
        this.loading.hide();
        this.toast.show(error);
      }
    );


  }


  getTodo() {
   this.loading.show();
   this.getToken();
 this.getQuery= this.apollo
    .watchQuery({
      query: this.Query.todo,
      variables:{
        userId: this.userId.user._id
      },
    });
    this.items = this.getQuery.valueChanges
      .pipe(map((result) => result.data.todo));
     return  this.items;
    };

    removeItem(item){
      this.loading.show(),
      this.apollo
      .mutate({
        mutation: this.Query.delete,
        variables: {
          id: item
        },
      })
      .subscribe(
        ({ data }) => {
          this.loading.hide();
          const message: any = data;
          this.getTodo();
          this.toast.top(message.deleteTodo.message);
          window.location.reload();
        },
        (error) => {
          this.loading.hide();
          this.toast.show(error);
        }
      );

    };



    trackById(index: number, todo: Todo) {
      return todo.item;
  };


  completed(c) {
    this.isCompleted = !c.isCompleted;
    this.loading.show();
    console.log(c);
    this.apollo
    .mutate({
      mutation: this.Query.updateTodo,
      variables: {
        id:c.id, 
        item: c.item,
        userId:this.userId.user._id,
        isCompleted: this.isCompleted
      },

    })
    .subscribe(
      ({ data }) => {
        this.loading.hide();
        this.todoForm.reset();
        const message: any = data;
        this.toast.top(message.updateTodo.message);
        this.getTodo();
        window.location.reload();
      },
      (error) => {
        this.loading.hide();
        this.toast.show(error);
      }
    );
  }

  }




