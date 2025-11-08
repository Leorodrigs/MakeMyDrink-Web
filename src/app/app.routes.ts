import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { DrinksComponent } from './pages/drinks/drinks';
import { DrinkDetailComponent } from './pages/drink-detail/drink-detail';
import { CategoriesComponent } from './pages/categories/categories';
import { CategoryDrinksComponent } from './pages/category-drinks/category-drinks';
import { IngredientsComponent } from './pages/ingredients/ingredients';
import { IngredientDrinksComponent } from './pages/ingredient-drinks/ingredient-drinks';
import { GlassesComponent } from './pages/glasses/glasses';
import { GlassDrinksComponent } from './pages/glass-drinks/glass-drinks';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'drinks/:id', component: DrinkDetailComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:name', component: CategoryDrinksComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'ingredients/:name', component: IngredientDrinksComponent },
  { path: 'glasses', component: GlassesComponent },
  { path: 'glasses/:name', component: GlassDrinksComponent },
  { path: '**', redirectTo: '' },
];
