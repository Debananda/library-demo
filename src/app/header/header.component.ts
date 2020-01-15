import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarContent', { static: false }) navbarContent: ElementRef;
  isShown = false;
  isAuthenticated = false;
  constructor(
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if (user && user.token) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }
  toggleNav() {
    if (this.isShown) {
      this.renderer.removeClass(this.navbarContent.nativeElement, 'd-block');
      this.isShown = false;
    } else {
      this.renderer.addClass(this.navbarContent.nativeElement, 'd-block');
      this.isShown = true;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
