import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SocketService } from "@shared/services/socket/socket.service";
import { Subscription } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-contacts-result-file-import',
  templateUrl: './contacts-result-file-import.component.html',
  styleUrls: ['./contacts-result-file-import.component.scss']
})
export class ContactsResultFileImportComponent implements OnInit, OnDestroy {
  totalRecords = 0;
  totalRecordsSuccess = 0;
  totalRecordFalse = 0;
  importSuccess = false;
  @Input() fileName: string

  @Input() numOfRecords: number
  @Input() activeIndex: number
  @Input() file: File
  @Output() activeIndexChange = new EventEmitter<number>()
  private _interactionsSub: Subscription;

  constructor(
    injector: Injector,
    private readonly socketService: SocketService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this._interactionsSub = this.socketService.getNotificationImportDoneMessage().subscribe((data) => {
      if (data) {
        this.totalRecords = data['totalRows'] || 0
        this.totalRecordsSuccess = data['successRows'] || 0
        this.totalRecordFalse = data['errorRows'] || 0
        this.importSuccess = true
        this.messageService.add({
          severity: 'success',
          detail: `Hoàn tất tải lên ${data['successRows'] || 0} bản ghi liên hệ`
        })

      }
    });
  }

  ngOnDestroy(): void {
    this.showLog();
    if (this._interactionsSub) this._interactionsSub.unsubscribe();
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
