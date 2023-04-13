import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';

@Component({
  selector: 'app-dynamic-property-hide',
  templateUrl: './dynamic-property-hide.component.html',
  styleUrls: ['./dynamic-property-hide.component.scss']
})
export class DynamicPropertyHideComponent {

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
