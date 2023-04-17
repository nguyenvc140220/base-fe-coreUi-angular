import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicPropertyUpdateModel } from '@shared/models/dynamic-field/dynamic-property-update.model';
// import { takeUntil } from 'rxjs';
// import { DestroyService } from '@shared/services';

@Component({
  selector: 'app-dynamic-property-edit',
  templateUrl: './dynamic-property-edit.component.html',
  styleUrls: ['./dynamic-property-edit.component.scss']
})
export class DynamicPropertyEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicFieldService: DynamicFieldService,
    // private destroyService: DestroyService,
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
  ngOnDestroy(): void { }

  onDialogEvent(event: any) {
    switch (event) {
      case 'SAVE_BUTTON':
        const req = new DynamicPropertyUpdateModel({
          code: this.dynamicDialogConfig.data.entity.code,
          displayName: this.formGroup.value.displayName,
        });
        this.dynamicFieldService.updateDynamicProperties(req)
          // .pipe(takeUntil(this.destroyService))
          .subscribe({
            next: (res) => {
              console.log(res);
              this.ref.close();
            },
            error: (err) => {
              console.log(err);
            }
          });
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