import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballCardsComponent } from './basketball-cards.component';

describe('BasketballCardsComponent', () => {
  let component: BasketballCardsComponent;
  let fixture: ComponentFixture<BasketballCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketballCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketballCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
