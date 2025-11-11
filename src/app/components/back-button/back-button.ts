import { Component, output, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrls: ['./back-button.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BackButtonComponent {
  backClick = output<void>();

  constructor(private location: Location, private router: Router) {}

  onBack(): void {
    this.backClick.emit();

    if (window.history.length <= 1) {
      this.router.navigate(['/']);
      return;
    }

    this.location.back();
  }
}
