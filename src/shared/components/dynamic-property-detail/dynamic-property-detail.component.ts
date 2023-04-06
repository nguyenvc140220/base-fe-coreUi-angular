import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { FormGroup } from '@angular/forms';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum'

@Component({
  selector: 'app-dynamic-property-detail',
  templateUrl: './dynamic-property-detail.component.html',
  styleUrls: ['./dynamic-property-detail.component.scss']
})

export class DynamicPropertyDetailComponent {
  formGroup: FormGroup = new FormGroup({});
  entity: DynamicPropertyModel;
  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) { }
  ngOnInit(): void {
    if (this.dynamicDialogConfig.data.entity) {
      console.log('#### form data ####');
      console.log(this.dynamicDialogConfig.data.entity);
      this.entity = this.dynamicDialogConfig.data.entity;
      this.generateForm();
    }
  }
  generateForm() {
    switch(this.entity.dataType) {
      case DynamicDataTypeEnum.DATETIME:
        console.log('#### datetime ####');
        break;
      case DynamicDataTypeEnum.NUMBER:
        console.log('#### number ####');
        break;
      case DynamicDataTypeEnum.TEXT:
        console.log('#### text ####');
        break;
      case DynamicDataTypeEnum.LIST:
        console.log('#### list ####');
        break;
      default:
        console.log('#### default ####');
    }
  }
}
