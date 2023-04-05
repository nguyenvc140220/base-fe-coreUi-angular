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
import { ToastModule } from "primeng/toast";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { DatePipe, NgForOf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { CampaignsRoutingModule } from "./campaigns-routing.module";
import { CampaignsTableComponent } from './campaigns-table/campaigns-table.component';

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
  NgSwitchCase,
  NgSwitchDefault,
];

@NgModule({
  declarations: [
    CampaignsTableComponent
  ],
  imports: [
    ...PRIMENG,
    ...ANGULAR_COMMON,
    CampaignsRoutingModule,
    ToastModule,
    OverlayPanelModule,
    DatePipe,
  ],
  providers: [DialogService, DynamicDialogRef, DestroyService, MessageService],
  exports: [],
})
export class CampaignsModule {
}
