import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';

@Component({
  selector: 'app-dynamic-property-delete',
  templateUrl: './dynamic-property-delete.component.html',
  styleUrls: ['./dynamic-property-delete.component.scss']
})
export class DynamicPropertyDeleteComponent {

  formGroup: FormGroup;
  entity: DynamicPropertyModel;
  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnInit(): void {
    this.entity = this.dynamicDialogConfig.data.entity;
  }
  onDialogEvent(event: any) {
    switch (event) {
      case 'SAVE_BUTTON':
        console.log('SAVE_BUTTON');
        break;
      case 'CANCEL_BUTTON':
        console.log('CANCEL_BUTTON');
        this.ref.close();
        break;
    }
  }
}

// if (this.dynamicDialogConfig.data.entity) {
//   console.log('#### form data ####');
//   console.log(this.dynamicDialogConfig.data.entity);
//   this.formGroup.addControl('displayName', new FormControl({
//     value: this.dynamicDialogConfig.data.entity.displayName,
//     disabled: true,
//   }
//   ));
// }