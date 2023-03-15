import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-contacts-import',
  templateUrl: './contacts-import.component.html',
  styleUrls: ['./contacts-import.component.scss']
})
export class ContactsImportComponent implements OnInit {
  activeIndex = 0;
  steps: MenuItem[]

  ngOnInit(): void {
    this.initSteps()
  }


  private initSteps(): void {
    this.steps = [
      {
        label: 'Bước 1: Thêm file import',
      },
      {
        label: 'Bước 2: Mapping trường thông tin',
      },
      {
        label: 'Bước 3: Hoàn tất',
      },
    ];
  }
}
