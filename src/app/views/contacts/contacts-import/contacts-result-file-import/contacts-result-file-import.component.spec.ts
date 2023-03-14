import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsResultFileImportComponent } from './contacts-result-file-import.component';

describe('ContactsResultFileImportComponent', () => {
  let component: ContactsResultFileImportComponent;
  let fixture: ComponentFixture<ContactsResultFileImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsResultFileImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsResultFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
