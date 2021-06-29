// Library imports
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// Local imports
import {User} from './book-store/interfaces/user';
import {AuthenticationService} from '../shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}
