import {Component} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent {

  errorMessage: Array<string> = [];
  selectedBookCover: Blob = new Blob();
  selectedPicture: string | undefined;

  bookRequest: BookRequest = {authorName: "", isbn: "", synopsis: "", title: ""};

  constructor(private bookService: BookService,
              private router: Router) {
  }


  // permet de récupérer le fichier sélectionné par l'utilisateur et de l'afficher
  onFileSelected(file: Event) {
    // @ts-ignore
    this.selectedBookCover = file.target.files[0];
    if(this.selectedBookCover){
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string; // image en base64
      }
      reader.readAsDataURL(this.selectedBookCover); // conversion de base64 en une URL
    }

  }

  onSaveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }) .subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverPicture({
          'book-id' : bookId,
          body:{
            'file': this.selectedBookCover
          }
        }).subscribe({
          next:() => {
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error: (error) => {
        this.errorMessage = error.error.validationErrors;
      }
    })
  }
}
