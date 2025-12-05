import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DrinksService } from '../../services/drinks';
import { BackButtonComponent } from '../../components/back-button/back-button';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { CardItemComponent, CardData } from '../../components/card-item/card-item';

export interface IngredientDisplayItem {
  name: string;
}

@Component({
  selector: 'app-ingredients-list',
  imports: [CommonModule, BackButtonComponent, CardItemComponent, SearchBarComponent],
  templateUrl: './ingredients.html',
  styleUrls: ['./ingredients.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allIngredients = signal<IngredientDisplayItem[]>([]);
  public searchTerm = signal<string>('');

  // Computed que converte para CardData SEM imagem
  public filteredIngredients = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const ingredients = !term
      ? this.allIngredients()
      : this.allIngredients().filter((item) => item.name.toLowerCase().includes(term));

    return ingredients.map(
      (ingredient) =>
        ({
          title: ingredient.name,
          route: `/ingredients/${encodeURIComponent(ingredient.name)}`, // Adicione esta linha
        } as CardData)
    );
  });

  ngOnInit(): void {
    const ingredientNames = this.drinksService.getIngredients();
    const displayItems: IngredientDisplayItem[] = ingredientNames.map((name) => ({
      name: name,
    }));
    this.allIngredients.set(displayItems);
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onIngredientClick(cardData: CardData): void {
    console.log('Ingrediente clicado:', cardData.title);
    // Adicione sua lógica de navegação aqui
  }
}
