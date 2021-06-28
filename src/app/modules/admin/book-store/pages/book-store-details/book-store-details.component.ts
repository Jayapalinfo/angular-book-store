//Library imports
import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../../services";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../interfaces/book";

//Local imports

@Component({
  selector: 'app-book-store-details',
  templateUrl: './book-store-details.component.html',
  styleUrls: ['./book-store-details.component.css']
})
export class BookStoreDetailsComponent implements OnInit {

  id:string;
  book: Book;

  constructor(private readonly route: ActivatedRoute, private readonly bookStoreService: BookStoreService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBookDetails(this.id);
  }

  getBookDetails(id) {
    this.bookStoreService.getBookDetails(id).subscribe(
      data => {
        this.book = data;
      },
      error => {
        this.book = null ;
      }
    );
  }

}
