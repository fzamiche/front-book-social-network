import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Input() rating: number = 0;
  maxRating: number = 5;

  // sert à savoir combien d'étoiles pleines on doit afficher
  get fullStars(): number {
    return Math.floor(this.rating); // arrondir à l'entier inférieur ex : 3.5 => 3
  }

  // sert à savoir si on doit afficher une demi étoile
  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0; //
  }

  // sert à savoir combien d'étoiles vides on doit afficher
  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating); // arrondir à l'entier supérieur ex : 3.5 => 4
  }

}
