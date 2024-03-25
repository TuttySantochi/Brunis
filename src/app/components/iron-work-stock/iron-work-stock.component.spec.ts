import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IronWorkStockComponent } from './iron-work-stock.component';

describe('IronWorkStockComponent', () => {
  let component: IronWorkStockComponent;
  let fixture: ComponentFixture<IronWorkStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IronWorkStockComponent]
    });
    fixture = TestBed.createComponent(IronWorkStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
