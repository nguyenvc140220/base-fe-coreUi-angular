import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() segmentationForm: FormGroup;
  @Output() segmentationFormChange = new EventEmitter<FormGroup>;

  constructor(
    private readonly segmentationService: SegmentationService,
    private cdr: ChangeDetectorRef,
    private destroy: DestroyService) {};

  ngOnInit(): void {
    this.segmentationService
      .getSegmentations(
        this.searchKey ?? '',
        1,
        1000
      )
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: PageResponse<SegmentationListModel>) => {
          this.segmentations = res.data.content;
        }
      })

  }

  addSegmentation(event) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    let formGroupSegmentation = new FormGroup({
      segmentationSelected: new FormControl(null, [Validators.required]),
      query: new FormControl(this.segmentationQuery[1].value)
    })
    getForm.push(formGroupSegmentation)
  }

  removeSegmentation(i) {
    let getForm = this.segmentationForm.get('segmentations') as FormArray;
    getForm.removeAt(i);
    this.cdr.detectChanges();
  }
}
