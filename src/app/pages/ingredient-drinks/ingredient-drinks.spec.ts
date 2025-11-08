import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDrinks } from './ingredient-drinks';

describe('IngredientDrinks', () => {
  let component: IngredientDrinks;
  let fixture: ComponentFixture<IngredientDrinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientDrinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientDrinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
