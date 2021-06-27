//Library imports
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, throwError} from "rxjs";
import {map} from "rxjs/operators";

//Library imports
import {User} from "../../admin/book-store/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`/users/authenticate`, {username, password})
      .pipe(map(user => {
        if ('Admin' === user.userName) {
          console.log('user.username',user.userName);
          this.currentUserSubject.next(user);
          return user;
        } else {
          console.log('else');
          return this.error('Username or password is incorrect');
        }
      }));
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  error(message) {
    return throwError({ error: { message } });
  }
}
