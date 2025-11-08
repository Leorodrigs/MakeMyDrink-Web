import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Glasses } from './glasses';

describe('Glasses', () => {
  let component: Glasses;
  let fixture: ComponentFixture<Glasses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Glasses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Glasses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
