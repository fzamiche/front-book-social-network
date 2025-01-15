import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  page: number = 0;
  size: number = 10;
  bookResponse: PageResponseBookResponse = {};
  message: string = '';
  isSuccessBorrow: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    });
  }

  onBorrowBook(book: BookResponse) {
    this.message = '';
    this.bookService.borrowBook({
      'book-id' : book.id as number
    }).subscribe({
      next: () =>{
        this.isSuccessBorrow = true;
        this.message = 'Book successfully added to your list';
      },
      error: (error) => {
        this.isSuccessBorrow = false;
        this.message = error.error.error;
      }
    })
  }
}
