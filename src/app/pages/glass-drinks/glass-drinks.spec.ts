import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassDrinks } from './glass-drinks';

describe('GlassDrinks', () => {
  let component: GlassDrinks;
  let fixture: ComponentFixture<GlassDrinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassDrinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlassDrinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
