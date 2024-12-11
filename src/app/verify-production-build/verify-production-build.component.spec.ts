import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProductionBuildComponent } from './verify-production-build.component';

describe('VerifyProductionBuildComponent', () => {
  let component: VerifyProductionBuildComponent;
  let fixture: ComponentFixture<VerifyProductionBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyProductionBuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyProductionBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
