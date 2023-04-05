import { Component } from '@angular/core';
import { ButtonEnum } from "@shared/enums/button-status.enum";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-segmentation-delete-modal',
  templateUrl: './segmentation-delete-modal.component.html',
  styleUrls: ['./segmentation-delete-modal.component.scss']
})
export class SegmentationDeleteModalComponent {
  id: string;
  name: string;

  loading = false;

  private unsubscribe = new Subject();

  constructor(
    config: DynamicDialogConfig,
    private readonly ref: DynamicDialogRef,
    private readonly segmentationService: SegmentationService) {
    this.id = config.data['id'];
    this.name = config.data['name'] ?? 'Không xác định';
  }

  handleDialogEvent($event: ButtonEnum) {
    if ($event === ButtonEnum.CANCEL_BUTTON) {
      this.ref.close();
    } else if ($event === ButtonEnum.SAVE_BUTTON) {
      this.loading = true;
      const dialogResult = {success: false, id: this.id, name: this.name};
      this.segmentationService
        .deleteSegmentation(this.id)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: res => {
            dialogResult.success = res.data;
            this.ref.close(dialogResult)
          },
          error: err => {
            console.error(`Cannot remove segmentation ${this.id} ${this.name} `, err);
            this.ref.close(dialogResult);
          },
          complete: () => this.loading = false
        });
    }
  }
}
