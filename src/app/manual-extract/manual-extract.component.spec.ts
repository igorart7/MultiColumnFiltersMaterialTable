import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualExtractComponent } from './manual-extract.component';

describe('ManualExtractComponent', () => {
  let component: ManualExtractComponent;
  let fixture: ComponentFixture<ManualExtractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualExtractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
