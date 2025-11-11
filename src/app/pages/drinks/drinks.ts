import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DrinksService, Drink } from '../../services/drinks';
import { BackButtonComponent } from '../../components/back-button/back-button';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { CardItemComponent, CardData } from '../../components/card-item/card-item';

@Component({
  selector: 'app-drinks-list',
  imports: [CommonModule, BackButtonComponent, SearchBarComponent, CardItemComponent],
  templateUrl: './drinks.html',
  styleUrls: ['./drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');

  // Computed que filtra APENAS pelo nome do drink
  // Computed que converte Drinks para CardData
  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const drinks = !term
      ? this.allDrinks()
      : this.allDrinks().filter((drink) => drink.strDrink.toLowerCase().includes(term));

    // Mapeia para CardData com imagem e subtitle
    return drinks.map(
      (drink) =>
        ({
          title: drink.strDrink,
          image: drink.strDrinkThumb,
          subtitle: drink.strCategory,
          route: `/drinks/${drink.idDrink}`, // CORRIJA: estava sem a barra inicial
        } as CardData)
    );
  });

  ngOnInit(): void {
    const allDrinks = this.drinksService.getAllDrinks();
    this.allDrinks.set(allDrinks);
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onDrinkClick(cardData: CardData): void {
    console.log('Drink clicado:', cardData.title);
  }
}
