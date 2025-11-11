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
  selector: 'category',
  imports: [CommonModule, BackButtonComponent, SearchBarComponent, CardItemComponent],
  templateUrl: './category-drinks.html',
  styleUrls: ['./category-drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  public categoryName = signal<string>('');
  private categoryDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');

  // Computed que filtra drinks da categoria pelo nome
  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const drinks = !term
      ? this.categoryDrinks()
      : this.categoryDrinks().filter((drink) => drink.strDrink.toLowerCase().includes(term));

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
    // Pega o nome da categoria da rota e decodifica
    const categoryNameParam = this.route.snapshot.paramMap.get('name');

    if (categoryNameParam) {
      // Decodifica o parâmetro da URL
      const decodedName = decodeURIComponent(categoryNameParam);
      this.categoryName.set(decodedName);

      // Busca drinks da categoria usando o nome decodificado
      const drinks = this.drinksService.getDrinksByCategory(decodedName);
      this.categoryDrinks.set(drinks);
    }
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onDrinkClick(cardData: CardData): void {
    console.log('Drink clicado:', cardData.title);
  }
}
