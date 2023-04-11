import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-property-edit',
  templateUrl: './dynamic-property-edit.component.html',
  styleUrls: ['./dynamic-property-edit.component.scss']
})
export class DynamicPropertyEditComponent {

  formGroup: FormGroup;
  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnInit(): void {
    this.formGroup.addControl('displayName', new FormControl({
      value: this.dynamicDialogConfig.data.entity?.displayName,
      disabled: false,
    }
    ));
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