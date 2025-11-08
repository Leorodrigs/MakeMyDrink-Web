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

export interface GlassDisplayItem {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-glasses-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonModule, IconFieldModule, InputTextModule],
  // CORRIGIDO: Apontando para os arquivos corretos
  templateUrl: './glasses.html',
  styleUrls: ['./glasses.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassesComponent implements OnInit {
  private drinksService = inject(DrinksService);
  private location = inject(Location);

  private allGlasses = signal<GlassDisplayItem[]>([]);
  public searchTerm = signal<string>('');

  public filteredGlasses = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.allGlasses();
    }
    return this.allGlasses().filter((item) => item.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    const glassNames = this.drinksService.getGlasses();
    const displayItems: GlassDisplayItem[] = glassNames.map((name) => {
      const drinksInGlass = this.drinksService.getDrinksByGlass(name);
      const imageUrl =
        drinksInGlass.length > 0
          ? drinksInGlass[0].strDrinkThumb
          : 'https://placehold.co/200x200/f5f5f4/333?text=Sem+Imagem';
      return { name: name, imageUrl: imageUrl };
    });
    this.allGlasses.set(displayItems);
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
  }

  back(): void {
    this.location.back();
  }
}
