import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileUpload } from "primeng/fileupload";
import Swal from "sweetalert2";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";


@Component({
  selector: 'app-contacts-add-file-import',
  templateUrl: './contacts-add-file-import.component.html',
  styleUrls: ['./contacts-add-file-import.component.scss']
})
export class ContactsAddFileImportComponent {
  disableBtn = true;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() numOfRecords: number
  @Output() numOfRecordsChange = new EventEmitter<number>()

  @Input() file: File
  @Output() fileChange = new EventEmitter<File>();

  constructor(
    private breadcrumbStore: BreadcrumbStore,
  ) {

    breadcrumbStore.items = [{
      label: 'Danh sách liên hệ',
      routerLink: '/contacts',
    }, {
      label: 'Import liên hệ',
    }];
  }

  chooseFile() {
    this.fileUpload.choose()
    this.disableBtn = false;
  }

  clearFile(i: number) {
    this.fileUpload.files.splice(i, 1)
    this.disableBtn = true;
  }

  nextStepMappingData() {
    if (this.fileUpload.files.length == 0)
      return Swal.fire({
        icon: 'warning',
        title: 'Cảnh báo',
        text: `Chưa chọn file import!!`,
      }).then();
    let file = this.fileUpload.files[0]
    let fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    this.fileUpload.clear()
    this.activeIndexChange.emit(1)
    this.fileChange.emit(file)
  }
}
