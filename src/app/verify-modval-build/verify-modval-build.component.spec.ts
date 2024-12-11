import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyModvalBuildComponent } from './verify-modval-build.component';

describe('VerifyModvalBuildComponent', () => {
  let component: VerifyModvalBuildComponent;
  let fixture: ComponentFixture<VerifyModvalBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyModvalBuildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyModvalBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
