import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DYNAMIC_FILTER_FORMAT } from '@shared/enums/dynamic-filter.const';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicFilterOperatorEnum } from '@shared/enums/dynamic-filter-operator.enum';
import { DynamicFilterTypeEnum } from '@shared/enums/dynamic-filter-type.enum';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
})
export class DynamicFilterComponent implements OnInit, OnDestroy {
  public form: FormGroup = this.fb.group({});
  entities: DynamicPropertyModel[] = [];
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
    const filter = JSON.parse(
      sessionStorage.getItem('contactDynamicFormValue')
    );
    const customTable = JSON.parse(
      sessionStorage.getItem('contactCustomTable')
    );
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
            this.entities = res.data.content
              .map((c, index) => {
                this.form.addControl(
                  c.code,
                  this.fb.control(filter ? filter[c.code] : null, [])
                );
                this.form.addControl(
                  c.code + '-operator',
                  this.fb.control(
                    filter ? filter[c.code + '-operator'] : null,
                    []
                  )
                );
                return {
                  code: c.code,
                  displayName: c.displayName,
                  dataType: c.dataType,
                  isDisplay:
                    customTable && customTable[c.code] != null
                      ? customTable[c.code].isDisplay
                      : true,
                  order:
                    customTable && customTable[c.code] != null
                      ? customTable[c.code].order
                      : index,
                } as DynamicPropertyModel;
              })
              .sort((a, b) => a.order - b.order);
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
        sessionStorage.setItem(
          'contactDynamicFormValue',
          JSON.stringify(this.form.value)
        );
        // console.log(this.getQuery(this.form.value));
        this.ref.close(this.getQuery(this.form.value));
        break;
      case ButtonEnum.RESET_BUTTON:
        this.form.reset();
        break;
      default:
        this.ref.close();
        break;
    }
  }

  getQuery(formValue) {
    var payload = [];
    this.entities.forEach((e) => {
      if (e.isDisplay && formValue[e.code] && formValue[e.code].trim() != '') {
        payload.push({
          field: e.code,
          operator: formValue[e.code + '-operator'],
          value: formValue[e.code].trim(),
        });
      }
    });
    if (payload.length > 0)
      return {
        type: DynamicFilterTypeEnum.AND,
        payload: payload,
      };
    return {};
  }

  getOption(e: DynamicPropertyModel) {
    let op = [...DYNAMIC_FILTER_FORMAT];
    switch (e.dataType) {
      case 'TEXT':
        return op.filter((x) =>
          [
            DynamicFilterOperatorEnum.CONTAIN,
            DynamicFilterOperatorEnum.MATCH,
            DynamicFilterOperatorEnum.EQ,
          ].includes(x.value)
        );
      case 'NUMBER':
        return op.filter((x) =>
          [
            DynamicFilterOperatorEnum.EQ,
            DynamicFilterOperatorEnum.GT,
            DynamicFilterOperatorEnum.GTE,
            DynamicFilterOperatorEnum.LT,
            DynamicFilterOperatorEnum.LTE,
          ].includes(x.value)
        );
      case 'DATETIME':
        return op.filter((x) =>
          [
            DynamicFilterOperatorEnum.BETWEEN,
            DynamicFilterOperatorEnum.GT,
            DynamicFilterOperatorEnum.GTE,
            DynamicFilterOperatorEnum.LT,
            DynamicFilterOperatorEnum.LTE,
          ].includes(x.value)
        );
      case 'BOOLEAN':
        return op.filter((x) =>
          [DynamicFilterOperatorEnum.EQ].includes(x.value)
        );
      // case default:
      //   return op.filter((x) => [Operator.In, Operator.Nin].includes(x.value));
    }
    return op;
  }
}
