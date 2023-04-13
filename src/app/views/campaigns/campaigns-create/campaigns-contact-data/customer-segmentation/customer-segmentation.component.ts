import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { takeUntil } from "rxjs";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { DestroyService } from "@shared/services";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicFilterOperatorEnum } from "@shared/enums/dynamic-filter-operator.enum";
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
  @Output() formGroupChange= new EventEmitter<FormGroup>;
  segmentationForm: FormGroup;
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

    this.segmentationForm = new FormGroup({
      segmentations: new FormArray([]),
      groupName: new FormControl('')
    });

    const getForm = this.segmentationForm.get('segmentations') as FormArray;

    let formGroupSegmentation = new FormGroup({
      options: new FormArray([]),
      segmentationSelected: new FormControl(null,[Validators.required]),
      conditional:new FormControl(this.segmentationQuery[1].value)
    })
    getForm.push(formGroupSegmentation)
  }

  loadSegmentation(event, index: number) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let options = getForm.at(index).get('options') as FormArray;
    options.clear()
    options.push(new FormControl(event.value))
    console.log(console.log(this.segmentationForm.value))
    if( this.segmentationForm.get('segmentations').value.length > 0){
      this.segmentationForm.get('segmentations').value.map(data => {
        console.log(data)
      })
    }
    this.segmentationForm.value['segmentations']
  }

  addSegmentation(event) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let formGroupSegmentation = new FormGroup({
      options: new FormArray([]),
      segmentationSelected: new FormControl(null,[Validators.required]),
      conditional:new FormControl(this.segmentationQuery[1].value)
    })
    getForm.push(formGroupSegmentation)
  }
}
