import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { takeUntil } from 'rxjs';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { removeNullValue } from '@shared/utils/object.utils';
import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-dynamic-create',
  templateUrl: './dynamic-edit.component.html',
  styleUrls: ['./dynamic-edit.component.scss'],
})
export class DynamicEditComponent
  extends DestroyService
  implements OnInit, OnDestroy {
  public form: FormGroup = this.fb.group({});
  entities = [];
  dynamicType: DynamicEntityTypeEnum;
  dynamicDataType: DynamicDataTypeEnum;
  isLoading = false;
  contactId: string;
  contactInfos = [];

  constructor(
    private fb: FormBuilder,
    private dynamicFieldService: DynamicFieldService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    super();
    this.dynamicType = config.data['type'];
    this.contactId = config.data['contactId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dynamicFieldService
      .getDynamicProperties({
        page: 1,
        type: this.dynamicType,
        size: 100,
      })
      .pipe(takeUntil(this))
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


    this.dynamicFieldService
      .getDynamicEntity({
        currentPage: 1,
        pageSize: 1,
        payload: {
          field: '_id',
          operator: 'EQ',
          value: this.contactId,
        },
        index: this.dynamicType,
      })
      .pipe(takeUntil(this))
      .subscribe((res) => {
        if (res.statusCode == 200 && res.data && res.data.totalElements > 0) {
          this.printEntityDetail(res.data.content[0]);
          console.log(res.data.content[0])
        }
      });
  }


  printEntityDetail(entity) {
    this.dynamicFieldService
      .getDynamicProperties({
        size: 100,
        page: 1,
        type: DynamicEntityTypeEnum.CONTACT,
      })
      .subscribe((res) => {
        if (res.statusCode == 200) {
          var properties = {};
          res.data.content.forEach((p) => {
            properties[p.code] = p.displayName;
          });
          this.contactInfos = [];
          Object.keys(entity).forEach((key) => {
            if (properties[key]) {
              this.form.get(key).setValue(entity[key]);
              this.contactInfos.push({
                title: properties[key],
                value: entity[key],
              });
            }
          });
        }
      });
  }

  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        if (this.form.valid) {
          this.isLoading = true;
          this.dynamicFieldService
            .updateDynamicEntity({
              code: this.dynamicType,
              idEntity: this.contactId,
              properties: removeNullValue(this.form.value),
            })
            .subscribe({
              next: (res) => {
                this.isLoading = false;
                if (res.statusCode == 200) {
                  this.ref.close(res.data);
                }
              },
              error: () => {
                this.isLoading = false;
              },
            });
        }
        break;
      default:
        this.ref.close();
        break;
    }
  }
}
