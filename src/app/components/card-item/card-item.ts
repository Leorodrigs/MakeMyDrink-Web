import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface CardData {
  title: string;
  image?: string;
  route?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-card-item',
  imports: [CommonModule],
  templateUrl: './card-item.html',
  styleUrls: ['./card-item.css'],
})
export class CardItemComponent {
  data = input.required<CardData>();
  cardClick = output<CardData>();

  constructor(private router: Router) {}

  navigate() {
    const cardData = this.data();
    console.log('Card clicado:', cardData);

    // Sempre emite o evento para o pai decidir
    this.cardClick.emit(cardData);

    // Navega automaticamente se houver rota
    if (cardData.route) {
      console.log('Navegando para:', cardData.route);
      this.router.navigate([cardData.route]);
    }
  }
}
