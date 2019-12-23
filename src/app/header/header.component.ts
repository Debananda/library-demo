import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbarContent', { static: false }) navbarContent: ElementRef;
  isShown = false;
  constructor(private renderer: Renderer2) {}

  ngOnInit() {}
  toggleNav() {
    if (this.isShown) {
      this.renderer.removeClass(this.navbarContent.nativeElement, 'd-block');
      this.isShown = false;
    } else {
      this.renderer.addClass(this.navbarContent.nativeElement, 'd-block');
      this.isShown = true;
    }
  }
}
