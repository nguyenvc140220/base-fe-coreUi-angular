import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { CampaignInteractionModel } from '@shared/models/campaign/campaign-interaction.model';
import { TestCampaignRequestModel } from '@shared/models/campaign/test-campaign-request.model';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { CampaignService } from '@shared/services/campaign/campaign.service';
import { DynamicFormBuilder } from '@shared/services/dynamic-field/dynamic-form-builder';
import { SocketService } from '@shared/services/socket/socket.service';
import { nullOrEmptyValidator } from '@shared/validators/check-pecial-characters-validators';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-campaign',
  templateUrl: './test-campaign.component.html',
  styleUrls: ['./test-campaign.component.scss'],
})
export class TestCampaignComponent implements OnDestroy {
  activeIndex = 0;
  isRunning = false;
  definitionId: string;
  formTestCampaign: FormGroup = new FormGroup({});
  testCampaignProperties: DynamicPropertyModel[];
  InfoOptions = [
    { value: 'customer_gender', label: 'Danh xưng khách hàng' },
    { value: 'customer_name', label: 'Tên khách hàng' },
    { value: 'limit_amount', label: 'Hạn mức tín dụng' },
    { value: 'due_date', label: 'Hạn thanh toán' },
    { value: 'product', label: 'Sản phẩm vay' },
    { value: 'outstanding_balance', label: 'Số tiền cần thanh toán' },
    { value: 'start_date', label: 'Ngày bắt đầu vay' },
    { value: 'end_date', label: 'Ngày kết thúc vay' },
    { value: 'total_loan', label: 'Tổng khoản vay' },
    { value: 'interest_rate', label: 'Lãi suất vay' },
    { value: 'bank_name', label: 'Tên ngân hàng' },
    { value: 'date', label: 'Ngày giao dịch' },
    { value: 'location', label: 'Tên chi nhánh' },
    { value: 'location_detail', label: 'Địa chỉ chi nhánh' },
    { value: 'transaction_date', label: 'Thời gian giao dịch' },
    { value: 'amount_money', label: 'Số tiền giao dịch' },
    { value: 'number_id', label: 'Số giấy tờ tùy thân' },
  ];

  additionKeys = {
    customer_gender: ['gender', 'pronoun'],
    customer_name: ['full_name', 'name'],
  };

  cols = [
    { field: 'action', title: 'Hành động' },
    { field: 'createdAt', title: 'Thời gian thực hiện' },
    { field: 'updatedAt', title: 'Thời gian cập nhật' },
    { field: 'input', title: 'Dữ liệu đầu vào' },
    { field: 'status', title: 'Trạng thái' },
    { field: 'output', title: 'Kết quả đầu ra' },
  ];

  interactions: CampaignInteractionModel[] = [];

  private _leadId = '';
  private _interactionsSub: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dynamicFormBuilder: DynamicFormBuilder,
    private readonly ref: DynamicDialogRef,
    private readonly campaignService: CampaignService,
    private readonly messageService: MessageService,
    private config: DynamicDialogConfig,
    private  readonly  socketService: SocketService
  ) {
    this._interactionsSub = this.socketService.getWorkflowInteractionMessage().subscribe((data)=>{
      if(data.leadId === this._leadId){
        this.getTestResults(this._leadId)
      }
    });
    if (config.data['definitionId'] !== undefined) {
      this.definitionId = config.data['definitionId'];
    }
    this.testCampaignProperties = [
      new DynamicPropertyModel({
        code: 'phoneNumber',
        displayName: 'Số điện thoại khách hàng',
        dataType: DynamicDataTypeEnum.TEXT,
        inputType: DynamicInputTypeEnum.PHONE_NUMBER,
        hintText: 'Nhập số điện thoại khách hàng...',
        tooltip: 'Nhập số điện thoại khách hàng...',
        validators: [
          { type: 'required', validatorValue: '1' },
          { type: 'string_length_min', validatorValue: '10' },
          { type: 'string_length_max', validatorValue: '12' },
          { type: 'string_pattern', validatorValue: '\\d+' },
        ],
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
          {
            type: 'string_pattern',
            validatorValue: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          },
        ],
      }),
    ];
    this.formTestCampaign = this.dynamicFormBuilder.generateFormGroup(
      this.formTestCampaign,
      this.testCampaignProperties
    );
    this.formTestCampaign.addControl('listOptions', this.fb.array([]));

    // this.getTestResults('99f341ba-5d18-4f8a-a597-59be30161e58');
  }
  ngOnDestroy(): void {
    if (this._interactionsSub) this._interactionsSub.unsubscribe();
  }

  get listOptions() {
    return this.formTestCampaign.controls['listOptions'] as FormArray;
  }

  getListOptionsValue() {
    const options = this.listOptions.controls.map((c) => {
      return {
        key: c.get('key').value,
        value: c.get('value').value,
      };
    });

    options.forEach((o) => {
      if (this.additionKeys[o.key])
        this.additionKeys[o.key].forEach((a) =>
          options.push({
            key: a,
            value: o.value,
          })
        );
    });

    return options;
  }
  addOptions() {
    const option = this.fb.group({
      key: ['customer_gender', []],
      value: [null, [Validators.required, nullOrEmptyValidator]],
    });
    this.listOptions.push(option);
  }
  removeOption(index) {
    this.listOptions.removeAt(index);
  }
  showError(index) {
    let control = this.listOptions?.controls[index]?.get('value');
    if (control && control.invalid && control.touched) {
      if (control?.errors?.required || control?.errors?.nullOrEmpty)
        return 'Không được bỏ trống!';
      if (control?.errors?.duplicate) return 'Lựa chọn đã tồn tại!';
    }
    return null;
  }

  getTestResults(leadId: string) {
    this.campaignService.getTestResults(leadId).subscribe((res) => {
      if (res.success == true) this.interactions = res.data;
    });
  }

  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        // this.isRunning = true;
        this.campaignService
          .testCampaign(
            new TestCampaignRequestModel(
              this.formTestCampaign.get('phoneNumber').value,
              this.formTestCampaign.get('email').value,
              this.definitionId,
              JSON.stringify(this.getListOptionsValue())
            )
          )
          .subscribe((res) => {
            this.activeIndex = 1;
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: `Chạy thử chiến dịch thành công!`,
            });
            this._leadId = res.id;
          });
        break;
      default:
        this.ref.close();
        break;
    }
  }

  getActionLabel(action: string): string {
    switch (action) {
      case 'AUTOCALL_IVR':
        return 'Gọi tự động';
      case 'AUTO_EMAIL':
        return 'Gửi mail tự động';
      case 'AUTO_CHAT':
        return 'Chat tự động';
      default:
        return 'Gọi tự động';
    }
  }

  getStateLabel(state: string): string {
    switch (state) {
      case 'RUNNING':
        return 'Đang thực hiện';
      case 'SUCCEEDED':
        return 'Thành công';
      case 'FAILED':
        return 'Thất bại';
      default:
        return 'Đang khởi tạo';
    }
  }

  getColor(state: string): string {
    switch (state) {
      case 'RUNNING':
        return 'info';
      case 'SUCCEEDED':
        return 'success';
      case 'FAILED':
        return 'danger';
      default:
        return 'warning';
    }
  }
}
