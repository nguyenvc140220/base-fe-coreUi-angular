import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contacts-result-file-import',
  templateUrl: './contacts-result-file-import.component.html',
  styleUrls: ['./contacts-result-file-import.component.scss']
})
export class ContactsResultFileImportComponent implements OnInit, OnDestroy {
  @Input() numOfRecords: number
  @Input() activeIndex: number
  @Input() file: File
  @Output() activeIndexChange = new EventEmitter<number>()

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
