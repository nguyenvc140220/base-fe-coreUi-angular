import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contacts-mapping-file-import',
  templateUrl: './contacts-mapping-file-import.component.html',
  styleUrls: ['./contacts-mapping-file-import.component.scss']
})
export class ContactsMappingFileImportComponent {
  @Input() activeIndex: number
}
