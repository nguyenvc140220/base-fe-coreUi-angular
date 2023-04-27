import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SEGMENTATION_QUERY } from "@shared/constant/campaign.const";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { Subject, takeUntil } from "rxjs";
import { CreateCampaignRequestModel } from "@shared/models/campaign/create-campaign-request.model";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { DynamicFilterTypeEnum } from "@shared/enums/dynamic-filter-type.enum";
import { ContactService } from "@shared/services/contacts/contact.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0
  definitionId: string;
  campaignsGeneralForm: FormGroup;
  segmentationForm: FormGroup;
  segmentationQuery = SEGMENTATION_QUERY;
  query: DynamicQueryModel = {
    payload: {},
  };
  totalContactsCount = 0
  private unsubscribe = new Subject();

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private readonly messageService: MessageService,
    private readonly campaignService: CampaignService,
    private readonly contactService: ContactService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    breadcrumbStore.items = [{
      label: 'Chiến dịch',
      routerLink: '/campaigns',
    }, {
      label: 'Thêm mới chiến dịch',
    }];
    this.definitionId = this.router.getCurrentNavigation().extras.state['definitionId'];
  }


  ngOnInit() {
    this.items = [
      {
        label: 'Thông tin chung',
        icon: '',
        command: () => {
          this.activeIndex = 0;
          // const steps_number = document.getElementsByClassName('p-steps-number');
          // const steps_title = document.getElementsByClassName('p-steps-title ');
          // steps_number[0].setAttribute('style', 'color: #2196F3;');
          // steps_title[0].setAttribute('style', 'color: #2196F3;');
        },
      },
      {
        label: 'Data khách hàng',
        command: () => {
          this.activeIndex = 1;
        },
      },
      {
        label: 'Cấu hình',
        command: () => {
          this.activeIndex = 2;
        },
      },
      {
        label: 'Hoàn tất',
        command: () => {
          this.activeIndex = 3;
          this.query = {};
          if (this.segmentationForm.valid) {
            this.handlFromSegment()
          }
        },
      }
    ];
    this.initForm();
  }

  btnSaveOrNext() {

    if (this.campaignsGeneralForm.valid) {
      this.checkValidStepSuccess(0);
    }
    if (this.segmentationForm.valid) {
      this.checkValidStepSuccess(1);
    }

    if (this.activeIndex == 3) {
      this.query = {};
      if (this.segmentationForm.valid) {
        this.handlFromSegment()
      }
      // save data
      if (this.campaignsGeneralForm.valid && this.segmentationForm.valid) {
        let agentIds = []
        if (this.campaignsGeneralForm.value['assignedUser']) {
          this.campaignsGeneralForm.value['assignedUser'].map(el => agentIds.push(el.id));
        }
        let body = new CreateCampaignRequestModel();
        body.name = this.campaignsGeneralForm.value.name.trim();
        body.type = this.campaignsGeneralForm.value.type.value;
        body.workflowId = this.definitionId;
        body.agentIds = agentIds.toString();
        body.description = this.campaignsGeneralForm.value.description?.trim()
        body.startCallTime = this.campaignsGeneralForm.value.startCallTime
        body.endCallTime = this.campaignsGeneralForm.value.endCallTime
        body.timeFrom = this.datePipe.transform(this.campaignsGeneralForm.value.timeFrom, 'HH:mm');
        body.timeTo = this.datePipe.transform(this.campaignsGeneralForm.value.timeTo, 'HH:mm');
        body.customerType = this.segmentationForm.value.dataContactType
        body.segmentQuery = JSON.stringify(this.query);
        this.campaignService.createCampaign(body).pipe(takeUntil(this.unsubscribe)).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: `Lưu thành công!`,
            });
            return this.router.navigate(['campaigns']);
          }
        });

      }
    } else {
      // next step
      this.activeIndex += 1;
    }
  }

  btnCancel() {
    this.router.navigate(['campaigns']);
  }

  onActiveIndexChange(e) {
    if (this.campaignsGeneralForm.valid) {
      this.checkValidStepSuccess(0);
    }

    if (this.segmentationForm.valid) {
      return this.checkValidStepSuccess(1);
    }
  }

  initForm() {
    this.campaignsGeneralForm = new FormGroup({
      name: new FormControl(null, [Validators.required, validatorTrim]),
      type: new FormControl(null, [Validators.required]),
      assignedUser: new FormControl(null),
      startCallTime: new FormControl(null, [Validators.required]),
      endCallTime: new FormControl(null, [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });

    this.segmentationForm = new FormGroup({
      checkDupPhone: new FormControl(null),
      dataContactType: new FormControl(null, [Validators.required]),
      segmentations: new FormArray([
        new FormGroup({
          options: new FormArray([]),
          segmentationSelected: new FormControl(null, [Validators.required]),
          query: new FormControl(this.segmentationQuery[1].value)
        })
      ]),
    });
  }

  checkValidStepSuccess(i) {
    const steps_number = document.getElementsByClassName('p-steps-number');
    const steps_title = document.getElementsByClassName('p-steps-title ');
    steps_number[i].setAttribute('style', 'color: #1B5E20; background: #E8F5E9;');
    steps_title[i].setAttribute('style', 'color: #1B5E20;');
  }

  handlFromSegment() {
    var payload = this.segmentationForm.get('segmentations').value.map(data => {
      let _payload = [];
      console.log(data.segmentationSelected)
      data.segmentationSelected.forEach(el => {
        _payload.push(el.filters[0]);
      })
      return {
        type: data.query,
        payload: _payload,
      };
    });
    this.query.payload = {
      type: DynamicFilterTypeEnum.AND,
      payload: payload
    }
    this.query.currentPage = 1;
    this.query.pageSize = 1;
    this.contactService.getContacts(this.query).subscribe((res) => {
      this.totalContactsCount = res.data.totalElements;
    });
  }
}

function validatorTrim(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const trimName = control.value.trim();
    if (trimName == "") return {'required': true};
    const regex = new RegExp('^[a-zA-Z0-9\/\-\/\-\\s]*$');
    if (control.value && !regex.test(trimName)) return {'pattern': true};
    return null;
  }
  return null;
}
