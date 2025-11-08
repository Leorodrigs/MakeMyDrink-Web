import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DrinksService, Drink } from '../../services/drinks';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-category-drinks',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonModule, IconFieldModule, InputTextModule],
  // CORRIGIDO: Apontando para os arquivos corretos
  templateUrl: './category-drinks.html',
  styleUrls: ['./category-drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  private routeDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');
  public categoryName = signal<string>('');

  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.routeDrinks();
    }
    return this.routeDrinks().filter((drink) => drink.strDrink.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // Usa 'name' como definido no seu app.routes.ts
      const name = params.get('name');
      if (name) {
        this.categoryName.set(decodeURIComponent(name));
        const filteredDrinks = this.drinksService.getDrinksByCategory(name);
        this.routeDrinks.set(filteredDrinks);
      } else {
        console.error('Nome da categoria não encontrado na rota!');
      }
    });
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
  }

  back(): void {
    this.location.back();
  }
}
