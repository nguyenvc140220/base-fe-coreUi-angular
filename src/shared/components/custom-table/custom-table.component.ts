import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { Subject, takeUntil } from 'rxjs';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit, OnDestroy {
  columnTable: DynamicPropertyModel[] = [];
  cols: DynamicPropertyModel[] = [
    new DynamicPropertyModel({ code: 'header', displayName: 'Chọn tất cả' }),
  ];
  selectedCols: DynamicPropertyModel[] = [];

  dynamicType: DynamicEntityTypeEnum;
  isLoading = false;
  private unsubscribe = new Subject();

  constructor(
    private dynamicFieldService: DynamicFieldService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.dynamicType = config.data['type'];
    if (config.data['columns'] !== undefined) {
      this.columnTable = JSON.parse(config.data['columns']);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
  ngOnInit() {
    if (this.columnTable.length == 0) {
      this.isLoading = true;
      this.dynamicFieldService
        .getDynamicProperties({
          page: 1,
          type: this.dynamicType,
          size: 100,
        })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.statusCode == 200) {
              this.columnTable = res.data.content.map((c, index) => {
                return new DynamicPropertyModel({
                  code: c.code,
                  displayName: c.displayName,
                  isDisplay: true,
                  index: index,
                });
              });
              this.selectedCols = this.columnTable;
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
    } else {
      this.selectedCols = this.columnTable.filter((c) => c.isDisplay);
    }
  }

  onRowSelect(event) {
    event.data.isDisplay = true;
  }
  onRowUnselect(event) {
    event.data.isDisplay = false;
  }
  checkboxToggle(event) {
    this.columnTable
      .filter((c) => !c.isFixed)
      .forEach((c) => (c.isDisplay = event.checked));
  }

  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.CANCEL_BUTTON:
        this.ref.close();
        break;
      case ButtonEnum.SAVE_BUTTON:
        this.columnTable.forEach((c, index) => (c.order = index));
        this.ref.close(this.columnTable);
        break;
      case ButtonEnum.RESET_BUTTON:
        this.columnTable.forEach((c) => (c.isDisplay = true));
        this.selectedCols = this.columnTable;
        break;
      default:
        break;
    }
  }
}
