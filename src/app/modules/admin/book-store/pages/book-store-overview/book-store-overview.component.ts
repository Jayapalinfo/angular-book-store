//Library imports
import {Component, OnInit} from '@angular/core';

//Local imports
import {Book} from "../../interfaces/book";
import {BookStoreService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-store-overview',
  templateUrl: './book-store-overview.component.html',
  styleUrls: ['./book-store-overview.component.css']
})
export class BookStoreOverviewComponent implements OnInit {

  books: Book[];

  constructor(private readonly bookStoreService: BookStoreService,private readonly router: Router) {
    this.books = [];
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookStoreService.getBooks().subscribe(
      data => {
        console.log('data',data);
        this.books = data;
      },
      error => {
        console.log('error',error);
        this.books = [];
      }
    );
  }

  getBookDetails(id){
    this.router.navigateByUrl('app/admin/books/details/'+id);
  }

}
