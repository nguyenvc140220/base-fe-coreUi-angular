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
import { DatePipe, NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { CampaignsRoutingModule } from "./campaigns-routing.module";
import { CampaignsTableComponent } from './campaigns-table/campaigns-table.component';
import { StyleClassModule } from "primeng/styleclass";
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { PanelModule } from "primeng/panel";
import { CardModule } from "primeng/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CampaignsCreateComponent } from './campaigns-create/campaigns-create.component';
import { StepsModule } from "primeng/steps";
import {
  CampaignsGeneralInformationComponent
} from './campaigns-create/campaigns-general-information/campaigns-general-information.component';
import {
  CampaignsContactDataComponent
} from './campaigns-create/campaigns-contact-data/campaigns-contact-data.component';
import {
  CampaignsConfigurationComponent
} from './campaigns-create/campaigns-configuration/campaigns-configuration.component';
import { CampaignsCompletedComponent } from './campaigns-create/campaigns-completed/campaigns-completed.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CheckboxModule } from "primeng/checkbox";

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
    CampaignsTableComponent,
    CampaignsCreateComponent,
    CampaignsGeneralInformationComponent,
    CampaignsTableComponent,
    CampaignDetailComponent,
    CampaignsContactDataComponent,
    CampaignsConfigurationComponent,
    CampaignsCompletedComponent
  ],
  imports: [
    ...PRIMENG,
    ...ANGULAR_COMMON,
    CampaignsRoutingModule,
    ToastModule,
    OverlayPanelModule,
    DatePipe,
    NgStyle,
    NgIf,
    StyleClassModule,
    StepsModule,
    PanelModule,
    CardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgClass,
    AutoCompleteModule,
    CheckboxModule
  ],
  providers: [DialogService, DynamicDialogRef, DestroyService, MessageService],
  exports: [],
})
export class CampaignsModule {
}
