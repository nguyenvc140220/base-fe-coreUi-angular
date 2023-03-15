import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-result-file-import',
  templateUrl: './contacts-result-file-import.component.html',
  styleUrls: ['./contacts-result-file-import.component.scss']
})
export class ContactsResultFileImportComponent {
  @Input() activeIndex: number
}
