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

export interface GlassDisplayItem {
  name: string;
}

@Component({
  selector: 'app-glasses-list',
  imports: [CommonModule, BackButtonComponent, SearchBarComponent, CardItemComponent],
  templateUrl: './glasses.html',
  styleUrls: ['./glasses.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassesComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allGlasses = signal<GlassDisplayItem[]>([]);
  public searchTerm = signal<string>('');

  // Computed que converte para CardData SEM imagem
  public filteredGlasses = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const glasses = !term
      ? this.allGlasses()
      : this.allGlasses().filter((item) => item.name.toLowerCase().includes(term));

    return glasses.map(
      (glass) =>
        ({
          title: glass.name,
          route: `/glasses/${encodeURIComponent(glass.name)}`, // Adicione esta linha
        } as CardData)
    );
  });

  ngOnInit(): void {
    const glassNames = this.drinksService.getGlasses();
    const displayItems: GlassDisplayItem[] = glassNames.map((name) => ({
      name: name,
    }));
    this.allGlasses.set(displayItems);
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onGlassClick(cardData: CardData): void {
    console.log('Copo clicado:', cardData.title);
    // Adicione sua lógica de navegação aqui
  }
}
