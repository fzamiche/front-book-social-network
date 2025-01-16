import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  private _page: number = 0;
  private _first: boolean | undefined = false;
  private _last: boolean | undefined = false;
  private _totalPages: number | undefined = 1;

  @Output()
  private pageChange: EventEmitter<number> = new EventEmitter<number>();



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

  get page(): number {
    return this._page;
  }

  @Input()
  set page(value: number) {
    this._page = value;
  }

  get first(): boolean | undefined {
    return this._first;
  }

  @Input()
  set first(value: boolean | undefined) {
    this._first = value;
  }

  get last(): boolean | undefined {
    return this._last;
  }

  @Input()
  set last(value: boolean | undefined) {
    this._last = value;
  }

  get totalPages(): number | undefined {
    return this._totalPages;
  }

  @Input()
  set totalPages(value: number | undefined) {
    this._totalPages = value;
  }

}
