import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  ngOnInit(): void {
    this.setActiveLink();
  }

  // Permet de gérer dynamiquement le style de la classe active sur le menu en fonction de la page courante
  private setActiveLink() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach((l => l.classList.remove('active')));
        link.classList.add('active');
      })
    });
  }

  logout() {

  }
}
