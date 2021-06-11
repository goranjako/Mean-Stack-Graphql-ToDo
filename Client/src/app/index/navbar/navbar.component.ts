import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from 'src/app/graphql/graphql.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit(): void {
  }
  logout() {
    this.service.logout();
    

    }
}
