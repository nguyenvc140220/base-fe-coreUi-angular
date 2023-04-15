import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from "rxjs";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { DestroyService } from "@shared/services";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SEGMENTATION_QUERY } from "@shared/constant/campaign.const";

@Component({
  selector: 'app-customer-segmentation',
  templateUrl: './customer-segmentation.component.html',
  styleUrls: ['./customer-segmentation.component.scss']
})
export class CustomerSegmentationComponent implements OnInit {
  segmentationQuery = SEGMENTATION_QUERY;
  segmentations: any[];
  searchKey: string;
  @Input() formGroup: FormGroup;
  @Output() formGroupChange = new EventEmitter<FormGroup>;
  @Input() segmentationForm: FormGroup;
  @Output() segmentationFormChange = new EventEmitter<FormGroup>;

  constructor(private readonly segmentationService: SegmentationService, private destroy: DestroyService) {};

  ngOnInit(): void {
    this.segmentationService
      .getSegmentations(
        this.searchKey ?? '',
        1,
        10
      )
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: PageResponse<SegmentationListModel>) => {
          this.segmentations = res.data.content;
        }
      })

  }

  loadSegmentation(event, index: number) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let options = getForm.at(index).get('options') as FormArray;
    options.clear()
    options.push(new FormControl(event.value))
    if (this.segmentationForm.get('segmentations').value.length > 0) {
      var payload = this.segmentationForm.get('segmentations').value.map(data => {
        let value = [];
        // data.segmentationSelected.forEach(el => {
        //   // value.push(el.id);
        // })
        return {
          field: "SEGMENTATION",
          operator: data.conditional,
          value: data.segmentationSelected,
        };
      })
      this.formGroup.controls['segmentQuery'].setValue(payload);
    }
  }

  addSegmentation(event) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let formGroupSegmentation = new FormGroup({
      options: new FormArray([]),
      segmentationSelected: new FormControl(null, [Validators.required]),
      conditional: new FormControl(this.segmentationQuery[1].value)
    })
    getForm.push(formGroupSegmentation)
  }
}
