import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface CardData {
  title: string;
  image: string;
  route?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [],
  templateUrl: './card-item.html',
  styleUrls: ['./card-item.css'],
})
export class CardItemComponent {
  @Input() data!: CardData;
  @Output() cardClick = new EventEmitter<CardData>();

  constructor(private router: Router) {}

  navigate() {
    if (this.cardClick.observed) {
      this.cardClick.emit(this.data);
    } else if (this.data.route) {
      this.router.navigate([this.data.route]);
    }
  }
}
