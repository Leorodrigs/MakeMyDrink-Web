import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDrinks } from './category-drinks';

describe('CategoryDrinks', () => {
  let component: CategoryDrinks;
  let fixture: ComponentFixture<CategoryDrinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDrinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDrinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
