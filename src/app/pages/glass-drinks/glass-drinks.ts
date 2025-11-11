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
  selector: 'app-glass-drinks',
  imports: [CommonModule, BackButtonComponent, SearchBarComponent, CardItemComponent],
  templateUrl: './glass-drinks.html',
  styleUrls: ['./glass-drinks.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassDrinksComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  public glassName = signal<string>('');
  private glassDrinks = signal<Drink[]>([]);
  public searchTerm = signal<string>('');

  // Computed que filtra drinks do tipo de copo pelo nome
  public filteredDrinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const drinks = !term
      ? this.glassDrinks()
      : this.glassDrinks().filter((drink) => drink.strDrink.toLowerCase().includes(term));

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
    // Pega o nome do copo da rota e decodifica
    const glassNameParam = this.route.snapshot.paramMap.get('name');

    if (glassNameParam) {
      // Decodifica o parâmetro da URL
      const decodedName = decodeURIComponent(glassNameParam);
      this.glassName.set(decodedName);

      // Busca drinks do tipo de copo usando o nome decodificado
      const drinks = this.drinksService.getDrinksByGlass(decodedName);
      this.glassDrinks.set(drinks);
    }
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onDrinkClick(cardData: CardData): void {
    console.log('Drink clicado:', cardData.title);
  }
}
