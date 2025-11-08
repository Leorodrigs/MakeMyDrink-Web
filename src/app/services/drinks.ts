import { Injectable } from '@angular/core';
import drinksData from '../../assets/data/drinks_brazil.json';

export interface Drink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  private drinks: Drink[] = drinksData as Drink[]; // ← Carrega aqui!

  constructor() {
    console.log(`Loaded ${this.drinks.length} drinks!`);
  }

  getAllDrinks(): Drink[] {
    return this.drinks;
  }

  getDrinkById(id: string): Drink | undefined {
    return this.drinks.find((drink) => drink.idDrink === id);
  }

  getCategories(): string[] {
    const categoriesSet = new Set<string>();

    this.drinks.forEach((drink) => {
      const categories = drink.strCategory.split(',').map((cat) => cat.trim());
      categories.forEach((category) => {
        if (category) {
          categoriesSet.add(category);
        }
      });
    });

    return Array.from(categoriesSet).sort();
  }

  getDrinksByCategory(category: string): Drink[] {
    return this.drinks.filter((drink) => {
      const categories = drink.strCategory.split(',').map((cat) => cat.trim());
      return categories.some((cat) => cat.toLowerCase() === category.toLowerCase());
    });
  }

  getIngredients(): string[] {
    const ingredients = new Set<string>();

    this.drinks.forEach((drink) => {
      for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Drink;
        const ingredient = drink[ingredientKey];

        if (ingredient && ingredient !== null) {
          ingredients.add(ingredient as string);
        }
      }
    });

    return Array.from(ingredients).sort();
  }

  getDrinksByIngredient(ingredientName: string): Drink[] {
    const lowerIngredient = ingredientName.toLowerCase();

    return this.drinks.filter((drink) => {
      for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Drink;
        const ingredient = drink[ingredientKey];

        if (ingredient && (ingredient as string).toLowerCase() === lowerIngredient) {
          return true;
        }
      }
      return false;
    });
  }

  getGlasses(): string[] {
    const glasses = new Set(this.drinks.map((d) => d.strGlass));
    return Array.from(glasses).sort();
  }

  getDrinksByGlass(glassName: string): Drink[] {
    return this.drinks.filter((drink) => drink.strGlass.toLowerCase() === glassName.toLowerCase());
  }
}
