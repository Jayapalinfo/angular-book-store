//Library imports
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, throwError, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

//Library imports
import {User} from "../../admin/book-store/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`/users/authenticate`, {username, password})
      .pipe(
        mergeMap(user =>
          (username !== user.userName) ? this.error('Username or password is incorrect') : of(this.currentUserSubject.next(user))
        ));
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  error(message) {
    return throwError({error: {message}});
  }
}
