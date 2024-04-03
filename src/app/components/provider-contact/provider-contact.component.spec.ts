import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderContactComponent } from './provider-contact.component';

describe('ProviderContactComponent', () => {
  let component: ProviderContactComponent;
  let fixture: ComponentFixture<ProviderContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderContactComponent]
    });
    fixture = TestBed.createComponent(ProviderContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
