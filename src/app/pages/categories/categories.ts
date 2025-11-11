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
import { CardItemComponent, CardData } from '../../components/card-item/card-item';
import { SearchBarComponent } from '../../components/search-bar/search-bar'; // ADICIONE

export interface CategoryDisplayItem {
  name: string;
}

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, BackButtonComponent, CardItemComponent, SearchBarComponent],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allCategories = signal<CategoryDisplayItem[]>([]);
  public searchTerm = signal<string>('');

  public filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const categories = !term
      ? this.allCategories()
      : this.allCategories().filter((category) => category.name.toLowerCase().includes(term));

    return categories.map(
      (cat) =>
        ({
          title: cat.name,
          route: `/categories/${encodeURIComponent(cat.name)}`, // Codifica caracteres especiais
        } as CardData)
    );
  });

  ngOnInit(): void {
    const categoryNames = this.drinksService.getCategories();
    const displayItems: CategoryDisplayItem[] = categoryNames.map((name) => ({
      name: name,
    }));
    this.allCategories.set(displayItems);
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onCategoryClick(cardData: CardData): void {
    console.log('Categoria clicada:', cardData.title);
  }
}
