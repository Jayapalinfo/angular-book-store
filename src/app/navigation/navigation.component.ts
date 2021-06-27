import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../modules/shared/services";
import {User} from "../modules/admin/book-store/interfaces/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  navigationItems: NavigationItem[] = [
    {name: 'Admin', link: '/app/admin'}
  ];

  readonly link = 'app/admin';

  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

export class NavigationItem {
  link: string;
  name: string;
}
