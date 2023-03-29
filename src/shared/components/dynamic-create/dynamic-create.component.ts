import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dynamic-create',
  templateUrl: './dynamic-create.component.html',
  styleUrls: ['./dynamic-create.component.scss'],
})
export class DynamicCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup = this.fb.group({});
  entities = [];
  dynamicType: DynamicEntityTypeEnum;
  dynamicDataType: DynamicDataTypeEnum;
  isLoading = false;
  private unsubscribe = new Subject();
  constructor(
    private fb: FormBuilder,
    private dynamicFieldService: DynamicFieldService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.dynamicType = config.data['type'];
  }

  ngOnInit(): void {
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
            this.entities = res.data.content.map((c, index) => {
              this.form.addControl(c.code, this.fb.control(null, []));
              return {
                code: c.code,
                displayName: c.displayName,
                dataType: c.dataType,
                order: index,
              };
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        this.ref.close();
        break;
      default:
        this.ref.close();
        break;
    }
  }
}
