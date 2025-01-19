import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../services/services/book.service";
import {
  PageResponseBookTransactionHistoryResponse
} from "../../../../services/models/page-response-book-transaction-history-response";
import {BookTransactionHistoryResponse} from "../../../../services/models/book-transaction-history-response";

@Component({
  selector: 'app-return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss']
})
export class ReturnBooksComponent implements OnInit {
  returnedBooks: PageResponseBookTransactionHistoryResponse = {};
  page = 0;
  size = 5;
  message: string = '';
  isSuccessReturn: boolean = false;

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.returnedBooks = response;
      }
    });
  }

  onPageChange(pageIndex: number) {
    this.page = pageIndex;
    this.findAllReturnedBooks();
  }

  approuveReturnBorrowedBook(book: BookTransactionHistoryResponse) {
    if(!book.returned){
      this.isSuccessReturn = false;
      this.message = "Book not returned yet";
    }
    this.bookService.approuveReturnBorrowedBook({
      "book-id": book.id as number
    }).subscribe({
      next:() => {
          this.isSuccessReturn = true;
          this.message = "Book returned successfully";
          this.findAllReturnedBooks()
      }
    });
  }
}
