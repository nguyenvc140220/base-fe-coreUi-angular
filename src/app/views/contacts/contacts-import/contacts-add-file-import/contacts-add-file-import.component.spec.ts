import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsAddFileImportComponent } from './contacts-add-file-import.component';

describe('ContactsAddFileImportComponent', () => {
  let component: ContactsAddFileImportComponent;
  let fixture: ComponentFixture<ContactsAddFileImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsAddFileImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsAddFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
