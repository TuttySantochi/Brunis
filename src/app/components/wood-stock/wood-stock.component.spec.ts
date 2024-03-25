import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodStockComponent } from './wood-stock.component';

describe('WoodStockComponent', () => {
  let component: WoodStockComponent;
  let fixture: ComponentFixture<WoodStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WoodStockComponent]
    });
    fixture = TestBed.createComponent(WoodStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
