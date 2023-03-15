import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsImportComponent } from './contacts-import.component';

describe('ContactsImportComponent', () => {
  let component: ContactsImportComponent;
  let fixture: ComponentFixture<ContactsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
