import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DrinksService, Drink } from '../../services/drinks';
import { BackButtonComponent } from '../../components/back-button/back-button';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { CardItemComponent, CardData } from '../../components/card-item/card-item';

@Component({
  selector: 'app-ingredient-drinks',
  imports: [CommonModule, BackButtonComponent, SearchBarComponent, CardItemComponent],
  templateUrl: './ingredient-drinks.html',
  styleUrls: ['./ingredient-drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientDrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  public ingredientName = signal<string>('');
  private ingredientDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');

  // Computed que filtra drinks do ingrediente pelo nome
  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const drinks = !term
      ? this.ingredientDrinks()
      : this.ingredientDrinks().filter((drink) => drink.strDrink.toLowerCase().includes(term));

    // Mapeia para CardData com imagem e subtitle
    return drinks.map(
      (drink) =>
        ({
          title: drink.strDrink,
          image: drink.strDrinkThumb,
          subtitle: drink.strCategory,
          route: `/drinks/${drink.idDrink}`,
        } as CardData)
    );
  });

  ngOnInit(): void {
    // Pega o nome do ingrediente da rota e decodifica
    const ingredientNameParam = this.route.snapshot.paramMap.get('name');

    if (ingredientNameParam) {
      // Decodifica o parâmetro da URL
      const decodedName = decodeURIComponent(ingredientNameParam);
      this.ingredientName.set(decodedName);

      // Busca drinks do ingrediente usando o nome decodificado
      const drinks = this.drinksService.getDrinksByIngredient(decodedName);
      this.ingredientDrinks.set(drinks);
    }
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onDrinkClick(cardData: CardData): void {
    console.log('Drink clicado:', cardData.title);
  }
}
