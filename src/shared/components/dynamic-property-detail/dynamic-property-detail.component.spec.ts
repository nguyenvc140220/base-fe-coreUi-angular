import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPropertyDetailComponent } from './dynamic-property-detail.component';

describe('DynamicPropertyDetailComponent', () => {
  let component: DynamicPropertyDetailComponent;
  let fixture: ComponentFixture<DynamicPropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPropertyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicPropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
