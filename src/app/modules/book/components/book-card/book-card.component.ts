import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _isManager: boolean = false;

  get book(): BookResponse {
    return this._book;
  }

  @Input() // est utilisé pour déclarer une propriété d'entrée (data depuis le parent vers l'enfant)
  set book(book: BookResponse) {
    this._book = book;
  }

  get bookCover(): string | undefined {
    if (this._book.bookCover) {
      return 'data:image/jpg;base64,' + this._book.bookCover; // conversion de l'image de base64 à une image affichable
    }
    return 'https://picsum.photos/200/300'; // image random si l'image n'est pas disponible
  }

  get isManager(): boolean {
    return this._isManager;
  }

  @Input()
  set manage(value: boolean) {
    this._isManager = value;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWantingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private showDetails: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShowDetails() {
    this.showDetails.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWantingList.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }
}
