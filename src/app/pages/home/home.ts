import { Component } from '@angular/core';
import { CardItemComponent, CardData } from '../../components/card-item/card-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  cards: CardData[] = [
    {
      title: 'Drinks',
      image: '/drinkIcon.png',
      route: '/drinks',
    },
    {
      title: 'Categorias',
      image: '/categoryIcon.png',
      route: '/categories',
    },
    {
      title: 'Ingredientes',
      image: '/ingredientIcon.png',
      route: '/ingredients',
    },
    {
      title: 'Copos',
      image: '/glassIcon.png',
      route: '/glasses',
    },
  ];
}
