import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUpload } from "primeng/fileupload";
import Swal from "sweetalert2";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import * as XLSX from 'xlsx'
import { ContactService } from "@shared/services/contacts/contact.service";
import { DEFAULT_COL_CONTACT } from "@shared/constant/contacts.const";
import { ColInfo } from "xlsx";

@Component({
  selector: 'app-contacts-add-file-import',
  templateUrl: './contacts-add-file-import.component.html',
  styleUrls: ['./contacts-add-file-import.component.scss']
})
export class ContactsAddFileImportComponent implements OnInit {
  disableBtn = true;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() numOfRecords: number
  @Output() numOfRecordsChange = new EventEmitter<number>()

  @Input() file: File
  @Output() fileChange = new EventEmitter<File>();

  constructor(
    private router: Router,
    private breadcrumbStore: BreadcrumbStore,
    private contactService: ContactService,
  ) {

    breadcrumbStore.items = [{
      label: 'Danh sách liên hệ',
      routerLink: '/contacts',
    }, {
      label: 'Import liên hệ',
    }];
  }

  ngOnInit(): void {
    console.log(this.file)
  }

  onUpload(e) {
    this.file = e.currentFiles[0]
  }

  backStepEnd() {
    this.router.navigate(['contacts']);
  }

  downloadTemplate() {
    this.contactService
      .getContactProperties({page: 1, size: 100})
      .subscribe((res) => {
        if (res.statusCode == 200) {
          let properties = res.data.content.map((p) => {
            return {
              ...p,
              order:
                DEFAULT_COL_CONTACT[p.code] != null
                  ? DEFAULT_COL_CONTACT[p.code].order
                  : p.creationTime,
            };
          });
          let header = properties.filter(
            (el) => el.visible && el.code != "creationSource"
          ).sort((a, b) => a.order - b.order).map(el => {return el.displayName});
          const worksheet = XLSX.utils.json_to_sheet([]);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

          /* fix headers */
          XLSX.utils.sheet_add_aoa(worksheet, [header], {origin: "A1"});

          const max_width = properties.map(el => {return {width: 20}}) as ColInfo;
          worksheet["!cols"] = [max_width];
          XLSX.writeFile(workbook, "Contacts_template.xlsx", {compression: true});
        }
      });
  }

  chooseFile() {
    this.fileUpload.choose()
    this.disableBtn = false;
  }

  clearFile() {
    this.fileUpload.files.splice(1, 1)
    this.disableBtn = true;
    this.file = undefined;
  }

  nextStepMappingData() {
    if (!this.file)
      return Swal.fire({
        icon: 'warning',
        title: 'Cảnh báo',
        text: `Chưa chọn file import!!`,
      }).then();
    this.activeIndexChange.emit(1)
    this.fileChange.emit(this.file)
  }
}
