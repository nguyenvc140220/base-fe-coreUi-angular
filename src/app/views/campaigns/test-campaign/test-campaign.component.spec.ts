import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCampaignComponent } from './test-campaign.component';

describe('TestCampaignComponent', () => {
  let component: TestCampaignComponent;
  let fixture: ComponentFixture<TestCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
