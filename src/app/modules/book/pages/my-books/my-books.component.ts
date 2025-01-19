import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

  page: number = 0;
  size: number = 3;
  bookResponse: PageResponseBookResponse = {};

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
      }
    });
  }

  onPageChange(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooks();
  }

  onArchiveBook(book: BookResponse) {

  }

  onShareBook(book: BookResponse) {
    this.bookService.updateShareableStatusBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    })
  }

  onEditBook(book: BookResponse) {
    this.router.navigate(['books', 'manage-book', book.id]);
  }
}
