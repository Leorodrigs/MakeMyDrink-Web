import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  inject,
  computed,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { DrinksService, Drink } from '../../services/drinks';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-drinks-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonModule, IconFieldModule, InputTextModule],
  // CORRIGIDO: Apontando para os arquivos corretos
  templateUrl: './drinks.html',
  styleUrls: ['./drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');

  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allDrinks();
    }
    return this.allDrinks().filter(
      (drink) =>
        drink.strDrink.toLowerCase().includes(term) ||
        drink.strCategory.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    const allDrinks = this.drinksService.getAllDrinks();
    this.allDrinks.set(allDrinks);
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
  }

  back(): void {
    this.location.back();
  }
}
