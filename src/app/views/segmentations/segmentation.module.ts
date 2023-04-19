import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { InputSwitchModule } from "primeng/inputswitch";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { KeyFilterModule } from "primeng/keyfilter";
import { MultiSelectModule } from "primeng/multiselect";
import { MenubarModule } from "primeng/menubar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SplitButtonModule } from "primeng/splitbutton";
import { ChipModule } from "primeng/chip";
import { TabViewModule } from "primeng/tabview";
import { NgModule } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DestroyService } from "@shared/services";
import { MessageService } from "primeng/api";
import { SegmentationRoutingModule } from "./segmentation-routing.module";
import { SegmentationsTableComponent } from './segmentations-table/segmentations-table.component';
import { ToastModule } from "primeng/toast";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DatePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { DialogButtonModule } from "@shared/components/dialog-button/dialog-button.module";
import { SegmentationDeleteModalComponent } from './segmentation-delete-modal/segmentation-delete-modal.component';
import { CoreModule } from "@shared/root.module";
import { TextTruncateModule } from "@shared/components/text-truncate/text-truncate.module";

const PRIMENG = [
  TableModule,
  PaginatorModule,
  ButtonModule,
  InputSwitchModule,
  DividerModule,
  InputTextModule,
  CalendarModule,
  KeyFilterModule,
  MultiSelectModule,
  MenubarModule,
  ProgressSpinnerModule,
  SplitButtonModule,
  ChipModule,
  TabViewModule,
];

const ANGULAR_COMMON = [
  NgSwitch,
  NgForOf,
  NgIf,
  NgSwitchCase,
  NgSwitchDefault,
];

const SHARED_COMPONENTS = [
  DialogButtonModule
];

@NgModule({
  declarations: [
    SegmentationsTableComponent,
    SegmentationDeleteModalComponent
  ],
  imports: [
    ...PRIMENG,
    ...ANGULAR_COMMON,
    ...SHARED_COMPONENTS,
    SegmentationRoutingModule,
    ToastModule,
    OverlayPanelModule,
    DatePipe,
    CoreModule,
    TextTruncateModule,
  ],
  providers: [DialogService, DynamicDialogRef, DestroyService, MessageService],
  exports: [],
})
export class SegmentationModule {

}
