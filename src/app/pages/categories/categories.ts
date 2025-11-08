import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { DrinksService } from '../../services/drinks';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

export interface CategoryDisplayItem {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonModule, IconFieldModule, InputTextModule],
  // CORRIGIDO: Apontando para os arquivos corretos
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
    if (!term) {
      return this.allCategories();
    }
    return this.allCategories().filter((category) => category.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    const categoryNames = this.drinksService.getCategories();
    const displayItems: CategoryDisplayItem[] = categoryNames.map((name) => {
      const drinksInCat = this.drinksService.getDrinksByCategory(name);
      const imageUrl =
        drinksInCat.length > 0
          ? drinksInCat[0].strDrinkThumb
          : 'https://placehold.co/200x200/f5f5f4/333?text=Sem+Imagem';

      return { name: name, imageUrl: imageUrl };
    });
    this.allCategories.set(displayItems);
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
  }

  back(): void {
    this.location.back();
  }
}
