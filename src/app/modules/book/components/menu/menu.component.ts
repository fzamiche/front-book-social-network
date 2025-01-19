import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  userName: string | null = null;

  ngOnInit(): void {
    this.setActiveLink();
    this.loadUserFromToken()
  }

  private loadUserFromToken(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      try {
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(token);
        this.userName = decodedToken.fullname;
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        this.userName = null;
      }
    } else {
      console.warn('Aucun token JWT trouvé');
      this.userName = null;
    }
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
      localStorage.removeItem('jwt-token');
      window.location.reload();
  }
}
