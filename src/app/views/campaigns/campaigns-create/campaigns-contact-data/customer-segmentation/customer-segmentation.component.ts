import { Component, OnInit } from '@angular/core';
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { takeUntil } from "rxjs";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { DestroyService } from "@shared/services";

@Component({
  selector: 'app-customer-segmentation',
  templateUrl: './customer-segmentation.component.html',
  styleUrls: ['./customer-segmentation.component.scss']
})
export class CustomerSegmentationComponent implements OnInit {
  conditionalSegmentation: any[];
  segmentations: any[];
  searchKey: string;

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
  }
}
