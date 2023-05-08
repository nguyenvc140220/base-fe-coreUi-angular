import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup, Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ConfigService } from "@shared/utils/config.service";
import { DynamicPropertyModel } from "@shared/models/dynamic-field/dynamic-property.model";
import { DynamicDataTypeEnum } from "@shared/enums/dynamic-data-type.enum";
import { DynamicFormBuilder } from "@shared/services/dynamic-field/dynamic-form-builder";
import { DynamicInputTypeEnum } from "@shared/enums/dynamic-input-type.enum";
import { ButtonEnum } from "@shared/enums/button-status.enum";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { TestCampaignRequestModel } from "@shared/models/campaign/test-campaign-request.model";
import { MessageService } from "primeng/api";
import { duplicateValidator, nullOrEmptyValidator } from "@shared/validators/check-pecial-characters-validators";

@Component({
  selector: 'app-campaigns-configuration',
  templateUrl: './campaigns-configuration.component.html',
  styleUrls: ['./campaigns-configuration.component.scss'],
})
export class CampaignsConfigurationComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  visible: boolean;
  serverId = "";
  data: SafeHtml;
  formTestCampaign: FormGroup = new FormGroup({});
  testCampaignProperties: DynamicPropertyModel[];
  InfoOptions = [
    {value:"customer_gender", label: "Danh xưng khách hàng"},
    {value:"customer_name", label: "Tên khách hàng"},
    {value:"limit_amount", label: "Hạn mức tín dụng"},
    {value:"due_date", label: "Hạn thanh toán"},
    {value:"product", label: "Sản phẩm vay"},
    {value:"outstanding_balance", label: "Số tiền cần thanh toán"},
    {value:"start_date", label: "Ngày bắt đầu vay"},
    {value:"end_date", label: "Ngày kết thúc vay"},
    {value:"total_loan", label: "Tổng khoản vay"},
    {value:"interest_rate", label: "Lãi suất vay"},
    {value:"bank_name", label: "Tên ngân hàng"},
    {value:"date", label: "Ngày giao dịch"},
    {value:"location", label: "Tên chi nhánh"},
    {value:"location_detail", label: "Địa chỉ chi nhánh"},
    {value:"amount_money", label: "Số tiền giao dịch"},
    {value:"number_id", label: "Số giấy tờ tùy thân"},
  ];
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    configService: ConfigService,
    private dynamicFormBuilder: DynamicFormBuilder,
    private ref: DynamicDialogRef,
    private campaignService: CampaignService,
    private readonly messageService: MessageService,
  ) {
    this.serverId = configService.workflowManagerUrl;
  }

  loadScripts() {
    const dynamicScripts = 'assets/elsa-custom-type.js';
    const node = document.createElement('script');
    node.src = dynamicScripts;
    node.type = 'text/javascript';
    node.async = false;
    document.head.appendChild(node);
  }

  ngOnInit(): void {
    this.data = this.sanitizer.bypassSecurityTrustHtml(`
    <elsa-studio-root server-url="${this.serverId}" monaco-lib-path="assets/monaco" config="assets/elsa-workflows-studio/assets/designer.config.json">
      <elsa-workflow-definition-editor-screen workflow-definition-id="${this.definitionId}">
      </elsa-workflow-definition-editor-screen>
    </elsa-studio-root>`);
    this.loadScripts();

    this.testCampaignProperties = [
      new DynamicPropertyModel({
        code: 'phoneNumber',
        displayName: 'Số điện thoại khách hàng',
        dataType: DynamicDataTypeEnum.TEXT,
        inputType: DynamicInputTypeEnum.PHONE_NUMBER,
        hintText: 'Nhập số điện thoại khách hàng...',
        tooltip: 'Nhập số điện thoại khách hàng...',
        validators: [
          { type: "required", validatorValue: "1" },
          { type: "string_length_min", validatorValue:"10"},
          { type: "string_length_max", validatorValue:"12"},
          { type: "string_pattern", validatorValue:"\\d+"}
        ]
      }),
      new DynamicPropertyModel({
        code: 'email',
        displayName: 'Địa chỉ email khách hàng',
        dataType: DynamicDataTypeEnum.TEXT,
        inputType: DynamicInputTypeEnum.EMAIL,
        hintText: 'Nhập địa chỉ email khách hàng ...',
        tooltip: 'Nhập địa chỉ email khách hàng ...',
        validators: [
          { type: 'required', validatorValue: '1' },
          { type :"string_pattern", validatorValue :"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
          ]
      }),
    ]
    this.formTestCampaign = this.dynamicFormBuilder.generateFormGroup(
      this.formTestCampaign,
      this.testCampaignProperties
    );
    this.formTestCampaign.addControl('listOptions' , this.fb.array([]));
    this.addOptions();
  }

  get listOptions() {
    return this.formTestCampaign.controls['listOptions'] as FormArray;
  }

  getListOptionsValue(){
    return this.listOptions.controls.map(c => {
      return {
        key: c.get("key").value,
        value: c.get("value").value
      }
    });
  }
  addOptions(){
    const option = this.fb.group({
      key: ['customer_gender', []],
      value: [null, [Validators.required, nullOrEmptyValidator]],
    });
    this.listOptions.push(option);
  }
  removeOption(index){
    this.listOptions.removeAt(index);
  }
  showError(index){
    let control = this.listOptions?.controls[index]?.get('value');
    if (control && control.invalid && control.touched) {
      if (control?.errors?.required || control?.errors?.nullOrEmpty) return 'Không được bỏ trống!';
      if (control?.errors?.duplicate) return 'Lựa chọn đã tồn tại!';
    }
    return null;
  }
  showDialog() {
    this.visible = true;
  }

  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        this.campaignService.testCampaign(new TestCampaignRequestModel(
          this.formTestCampaign.get('phoneNumber').value,
          this.formTestCampaign.get('email').value,
          this.definitionId,
          JSON.stringify(this.getListOptionsValue())
        )).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: `Chạy thử chiến dịch thành công!`,
          });
          this.visible = false;
        })
        break;
      default:
        this.visible = false;
        break;
    }
  }
}
