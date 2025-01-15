import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input()  page: number = 0;
  @Input()  first: boolean | undefined = false;
  @Input()  last: boolean | undefined = false;
  @Input()  totalPages: number | undefined = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  goToFirsPage() {
    this.pageChange.emit(0);
  }

  goToPreviousPage() {
    this.pageChange.emit(this.page - 1);
  }

  goToPage(pageIndex: number) {
    this.pageChange.emit(pageIndex);
  }

  goToNextPage() {
    this.pageChange.emit(this.page + 1);
  }

  goToLastPage() {
    this.pageChange.emit(this.totalPages as number - 1);
  }

}
