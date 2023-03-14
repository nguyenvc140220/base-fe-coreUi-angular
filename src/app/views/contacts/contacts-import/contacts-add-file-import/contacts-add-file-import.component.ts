import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-add-file-import',
  templateUrl: './contacts-add-file-import.component.html',
  styleUrls: ['./contacts-add-file-import.component.scss']
})
export class ContactsAddFileImportComponent {
  @Input() activeIndex: number
}
