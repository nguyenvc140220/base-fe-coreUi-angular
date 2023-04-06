import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignConcreteComponent } from './campaign-concrete.component';

describe('CampaignConcreteComponent', () => {
  let component: CampaignConcreteComponent;
  let fixture: ComponentFixture<CampaignConcreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignConcreteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignConcreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
