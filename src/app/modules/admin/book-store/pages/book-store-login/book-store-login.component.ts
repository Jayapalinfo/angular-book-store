// Library imports
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

// Local imports
import {AuthenticationService, NotificationService} from '../../../../shared/services';

@Component({
  selector: 'app-book-store-login',
  templateUrl: './book-store-login.component.html',
  styleUrls: ['./book-store-login.component.css']
})
export class BookStoreLoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
    this.loading = false;
    this.submitted = false;
    // redirect to books overview if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['books/overview']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  get fields() {
    return this.loginForm.controls;
  }

  onClickSubmit() {
    this.submitted = true;

    // form validation
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.fields.username.value, this.fields.password.value)
      .subscribe(
        data => {
          if (!this.returnUrl) {
            this.returnUrl = 'books/overview';
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.notificationService.displayNotifications(error);
          this.loading = false;
        });
  }

}
