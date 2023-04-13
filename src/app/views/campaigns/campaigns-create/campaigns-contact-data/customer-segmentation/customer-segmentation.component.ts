import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { takeUntil } from "rxjs";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { DestroyService } from "@shared/services";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-customer-segmentation',
  templateUrl: './customer-segmentation.component.html',
  styleUrls: ['./customer-segmentation.component.scss']
})
export class CustomerSegmentationComponent implements OnInit {
  conditionalSegmentation: any[];
  segmentations: any[];
  searchKey: string;
  @Input() formGroup: FormGroup;
  @Output() formGroupChange= new EventEmitter<FormGroup>;
  segmentationForm: FormGroup;
  constructor(private readonly segmentationService: SegmentationService, private destroy: DestroyService) {};

  ngOnInit(): void {
    this.conditionalSegmentation = [
      {label: "Thuộc phân khúc", value: "in"},
      {label: "Không thuộc phân khúc", value: "notIn"}
    ];
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

    this.segmentationForm = new FormGroup({
      segmentations: new FormArray([]),
      groupName: new FormControl('')
    });

    const getForm = this.segmentationForm.get('segmentations') as FormArray;

    let formGroupSegmentation = new FormGroup({
      options: new FormArray([]),
      segmentationOptions: new FormControl([Validators.required])
    })
    getForm.push(formGroupSegmentation)
  }

  loadSegmentation(event, index: number) {
    console.log(event);
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let options = getForm.at(index).get('options') as FormArray;
    options.clear()
    options.push(new FormControl(event.value))
  }

  addSegmentation(event) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let formGroupSegmentation = new FormGroup({
      options: new FormArray([]),
      segmentationOptions: new FormControl([Validators.required])
    })
    getForm.push(formGroupSegmentation)
  }
}
