// Library imports
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

// Local imports
import {User} from '../../admin/book-store/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get the current logged in user details
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Login as admin user and validate the user details
   * @param username logged in username
   * @param password logged in password
   */
  login(username: string, password: string) {
    return this.http.post<User>(`/users/authenticate`, {username, password})
      .pipe(
        map(user => {
            if (username === user.userName) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            } else {
              throw Error('Username or password is incorrect');
            }
          }
        ),
        catchError(error => {
          error = [{type: 'error', messages: [{message: error.message}]}];
          return throwError(error);
        })
      );
  }

  /**
   * Logout for curren user and remove the local storage.
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  /**
   * Throw an error message
   * @param message error message
   */
  error(message) {
    return throwError([{error: {message}}]);
  }
}
