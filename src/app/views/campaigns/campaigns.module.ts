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
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { DestroyService } from "@shared/services";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { OverlayPanelModule } from "primeng/overlaypanel";
import {
  DatePipe,
  JsonPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from "@angular/common";
import { CampaignsRoutingModule } from "./campaigns-routing.module";
import { CampaignsTableComponent } from './campaigns-table/campaigns-table.component';
import { StyleClassModule } from "primeng/styleclass";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CheckboxModule } from "primeng/checkbox";
import {
  CampaignDetailTabviewComponent
} from './campaign-detail/campaign-detail-tabview/campaign-detail-tabview.component';
import { CampaignSummaryComponent } from './campaign-detail/campaign-summary/campaign-summary.component';
import { CampaignConcreteComponent } from './campaign-detail/campaign-concrete/campaign-concrete.component';
import { ReportIndexModule } from "@shared/components/report-index/report-index.module";
import { TagModule } from "primeng/tag";
import { NgxEchartsModule } from "ngx-echarts";
import {
  CustomerSegmentationComponent
} from './campaigns-create/campaigns-contact-data/customer-segmentation/customer-segmentation.component';
import { AccordionModule } from "primeng/accordion";
import { TextTruncateModule } from "@shared/components/text-truncate/text-truncate.module";
import {
  LeadInteractionModalComponent
} from './campaign-detail/campaign-concrete/lead-interaction-modal/lead-interaction-modal.component';
import {
  LeadInteractionTableComponent
} from './campaign-detail/campaign-concrete/lead-interaction-table/lead-interaction-table.component';
import { DialogModule } from "primeng/dialog";
import { DialogButtonModule } from "@shared/components/dialog-button/dialog-button.module";
import { DynamicFormModule } from "@shared/components/dynamic-form/dynamic-form.module";
import { CoreModule } from "@shared/root.module";
import { RippleModule } from "primeng/ripple";
import { TestCampaignComponent } from './test-campaign/test-campaign.component';

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
  ReportIndexModule,
  FontAwesomeModule,
  ReactiveFormsModule,
  AutoCompleteModule,
  CheckboxModule
];

const ANGULAR_COMMON = [
  NgSwitch,
  NgForOf,
  NgSwitchCase,
  NgSwitchDefault,
  NgStyle,
  NgIf,
  NgClass,
];

@NgModule({
  declarations: [
    CampaignsTableComponent,
    CampaignDetailTabviewComponent,
    CampaignSummaryComponent,
    CampaignConcreteComponent,
    CampaignsCreateComponent,
    CampaignsGeneralInformationComponent,
    CampaignsTableComponent,
    CampaignsContactDataComponent,
    CampaignsConfigurationComponent,
    CampaignsCompletedComponent,
    CustomerSegmentationComponent,
    LeadInteractionModalComponent,
    LeadInteractionTableComponent,
    TestCampaignComponent
  ],
  imports: [
    ...PRIMENG,
    ...ANGULAR_COMMON,
    CampaignsRoutingModule,
    ToastModule,
    OverlayPanelModule,
    DatePipe,
    StyleClassModule,
    StepsModule,
    PanelModule,
    CardModule,
    FontAwesomeModule,
    ReportIndexModule,
    TagModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AccordionModule,
    FormsModule, ReactiveFormsModule, TextTruncateModule, JsonPipe, DialogModule, DialogButtonModule, DynamicFormModule, CoreModule, RippleModule
  ],
  providers: [DialogService, DynamicDialogRef, DestroyService, MessageService, DatePipe],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampaignsModule {
}
