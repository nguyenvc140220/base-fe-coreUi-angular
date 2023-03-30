import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { FileUpload } from "primeng/fileupload";
import * as XLSX from 'xlsx'
import Swal from "sweetalert2";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { DialogService } from "primeng/dynamicdialog";
import { UsersService } from "@shared/services/users/users.service";
import { ComponentBase } from "@shared/utils/component-base.component";


@Component({
  selector: 'app-contacts-add-file-import',
  templateUrl: './contacts-add-file-import.component.html',
  styleUrls: ['./contacts-add-file-import.component.scss']
})
export class ContactsAddFileImportComponent extends ComponentBase<any> {
  disableBtn = true;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() numOfRecords: number
  @Output() numOfRecordsChange = new EventEmitter<number>()

  @Input() file: File
  @Output() fileChange = new EventEmitter<File>();

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
  ) {
    super(injector);
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
    let file = this.fileUpload.files[0]
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(file)

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type: 'binary'})
      var excelData = XLSX.utils
        .sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
        ?.filter(o => !Object.keys(o).every(k => !o[k].toString().trim()))
      if (!excelData.length) {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: `File tải lên không có dữ liệu!!`,
        }).then();
        return;
      }
      console.log(excelData)
      this.fileUpload.clear()
      this.activeIndexChange.emit(1)
      this.numOfRecordsChange.emit(excelData.length)
      this.fileChange.emit(file)
    }
  }
}
