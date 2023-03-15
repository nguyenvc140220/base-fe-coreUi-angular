import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsMappingFileImportComponent } from './contacts-mapping-file-import.component';

describe('ContactsMappingFileImportComponent', () => {
  let component: ContactsMappingFileImportComponent;
  let fixture: ComponentFixture<ContactsMappingFileImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsMappingFileImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsMappingFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
