import {Component, OnInit} from '@angular/core';
import {BookRequest} from "../../../../services/models/book-request";
import {BookService} from "../../../../services/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-manage-book',
    templateUrl: './manage-book.component.html',
    styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit {

    errorMessage: Array<string> = [];
    selectedBookCover: Blob = new Blob();
    selectedPicture: string | undefined;

    bookRequest: BookRequest = {authorName: "", isbn: "", synopsis: "", title: ""};

    constructor(private bookService: BookService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        const bookId = this.activatedRoute.snapshot.params['bookId'];
        if (bookId) {
            this.bookService.findBookById({
                'book-id': bookId
            }) .subscribe({
                    next: (bookResponse) => {
                        this.bookRequest = {
                            id: bookResponse.id,
                            title: bookResponse.title as string,
                            authorName: bookResponse.authorName as string,
                            isbn: bookResponse.isbn as string,
                            synopsis: bookResponse.synopsis as string,
                            shareable: bookResponse.shareable
                        }
                        if(bookResponse.bookCover){
                          this.selectedPicture = 'data:image/jpg;base64,' + bookResponse.bookCover;
                        }
                    }
                })
        }
    }

    // permet de récupérer le fichier sélectionné par l'utilisateur et de l'afficher

    onFileSelected(file: any) {
        // @ts-ignore
        this.selectedBookCover = file.target.files[0];
        if (this.selectedBookCover) {
            const reader: FileReader = new FileReader();
            reader.onload = () => {
                this.selectedPicture = reader.result as string; // image en base64
            };
            reader.readAsDataURL(this.selectedBookCover); // conversion de base64 en une URL
        }
    }

    onSaveBook() {
        this.bookService.saveBook({
            body: this.bookRequest
        }).subscribe({
            next: (bookId) => {
                this.bookService.uploadBookCoverPicture({
                    'book-id': bookId,
                    body: {
                        'file': this.selectedBookCover
                    }
                }).subscribe({
                    next: () => {
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
