import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DrinksService, Drink } from '../../services/drinks';
import { BackButtonComponent } from '../../components/back-button/back-button';

@Component({
  selector: 'app-drink-detail',
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './drink-detail.html',
  styleUrls: ['./drink-detail.css'],
})
export class DrinkDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private drinksService = inject(DrinksService);

  drink = signal<Drink | null>(null);
  loading = signal(true);
  ingredients = signal<Array<{ name: string; measure: string }>>([]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDrink(id);
    }
  }

  loadDrink(id: string) {
    const drinkData = this.drinksService.getDrinkById(id);

    if (drinkData) {
      this.drink.set(drinkData);
      this.extractIngredients(drinkData);
    }

    this.loading.set(false);
  }

  extractIngredients(drink: Drink) {
    const ingredientsList: Array<{ name: string; measure: string }> = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}` as keyof Drink;
      const measureKey = `strMeasure${i}` as keyof Drink;

      const ingredient = drink[ingredientKey];
      const measure = drink[measureKey];

      if (ingredient && ingredient !== null) {
        ingredientsList.push({
          name: ingredient as string,
          measure: (measure as string) || '',
        });
      }
    }

    this.ingredients.set(ingredientsList);
  }
}
