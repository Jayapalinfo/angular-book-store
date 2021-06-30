// Library imports
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// Local imports
import {environment} from '../../../../../environments/environment';
import {Book} from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiBaseUrl: string;

  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Get list of books
   * @return list of Books
   */
  public getBooks(): Observable<Book[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.apiBaseUrl = environment.apiBaseUrl;
    return this.httpClient.get<Book[]>(`${this.apiBaseUrl}/books`, {headers});
  }

  /**
   * Get book details
   * @param id unique book id
   * @return book details
   */
  public getBookDetails(id: string): Observable<Book> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.apiBaseUrl = environment.apiBaseUrl;
    return this.httpClient.get<Book>(`${this.apiBaseUrl}/books/${id}`, {headers});
  }
}
