import {Component, OnInit} from '@angular/core';
import {
  PageResponseBookTransactionHistoryResponse
} from "../../../../services/models/page-response-book-transaction-history-response";
import {BookTransactionHistoryResponse} from "../../../../services/models/book-transaction-history-response";
import {BookService} from "../../../../services/services/book.service";
import {FeedBackRequest} from "../../../../services/models/feed-back-request";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  templateUrl: './borrowed-book-list.component.html',
  styleUrls: ['./borrowed-book-list.component.scss']
})
export class BorrowedBookListComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  borrowedBooks: PageResponseBookTransactionHistoryResponse = {};
  feedBackRequest: FeedBackRequest = {bookId: 0, comment: "", note: 0};
  selectedBook: BookTransactionHistoryResponse | undefined = undefined;

  constructor(private bookService: BookService,
              private feedbackService: FeedbackService) {
  }

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BookTransactionHistoryResponse) {
    this.selectedBook = book;
    this.feedBackRequest.bookId = book.id as number;
  }

  private findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (response) => {
        this.borrowedBooks = response;
      }
    })
  }

  onPageChange(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBorrowedBooks();
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowedBook({
      'book-id': this.selectedBook?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedBackRequest
    }).subscribe({
      next: () => {
      }
    });
  }
}
