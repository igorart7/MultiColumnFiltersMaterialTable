import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteToProductionComponent } from './promote-to-production.component';

describe('PromoteToProductionComponent', () => {
  let component: PromoteToProductionComponent;
  let fixture: ComponentFixture<PromoteToProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoteToProductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoteToProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
