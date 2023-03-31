import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'app-contacts-result-file-import',
  templateUrl: './contacts-result-file-import.component.html',
  styleUrls: ['./contacts-result-file-import.component.scss']
})
export class ContactsResultFileImportComponent implements OnInit, OnDestroy {
  totalRecords = 0;
  totalRecordsSuccess = 0;
  totalRecordFalse = 0;
  importSuccess = true;
  @Input() fileName: string

  @Input() numOfRecords: number
  @Input() activeIndex: number
  @Input() file: File
  @Output() activeIndexChange = new EventEmitter<number>()

  constructor(
    injector: Injector,
    private router: Router,
  ) {

  }

  ngOnDestroy(): void {
    this.showLog();
  }

  ngOnInit(): void {
  }

  endProgressImport() {
    if (this.importSuccess) {
      this.router.navigate(['contacts']);
    }
  }

  showLog() {
    if (!this.importSuccess) {
      return Swal.fire({
        icon: 'warning',
        title: 'Cảnh báo',
        text: `Hệ thống sẽ tiếp tục thực hiện tác vụ và gửi thông báo khi hoàn tất!!`,
      });
    }
  }
}
