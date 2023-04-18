import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SEGMENTATION_QUERY } from "@shared/constant/campaign.const";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { Subject, takeUntil } from "rxjs";
import { CreateCampaignRequestModel } from "@shared/models/campaign/create-campaign-request.model";

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
  private unsubscribe = new Subject();

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private readonly messageService: MessageService,
    private readonly campaignService: CampaignService,
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
      // save data
      if (this.campaignsGeneralForm.valid && this.segmentationForm.valid) {
        let agentIds = []
        if (this.campaignsGeneralForm.value['assignedUser']) {
          this.campaignsGeneralForm.value['assignedUser'].map(el => agentIds.push(el.id));
        }
        let body = new CreateCampaignRequestModel();
        body.name = this.campaignsGeneralForm.value.campaignName
        body.type = this.campaignsGeneralForm.value.campaignType.value
        body.workflowId = this.definitionId;
        body.agentIds = agentIds.toString();
        body.description = this.campaignsGeneralForm.value.description
        body.customerType = this.segmentationForm.value.dataContactType
        if (this.segmentationForm.get('segmentations').value.length > 0) {
          var payload = this.segmentationForm.get('segmentations').value.map(data => {
            let value = [];
            data.segmentationSelected.forEach(el => {
              value.push(el.id);
            })
            return {
              field: "SEGMENTATION",
              operator: data.conditional,
              value: value.toString(),
            };
          });
          body.segmentQuery = JSON.stringify(payload);
        }
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
      campaignName: new FormControl(null, [Validators.required]),
      campaignType: new FormControl(null, [Validators.required]),
      assignedUser: new FormControl(null),
      description: new FormControl(null),
    });

    this.segmentationForm = new FormGroup({
      checkDupPhone: new FormControl(null),
      dataContactType: new FormControl(null, [Validators.required]),
      segmentations: new FormArray([
        new FormGroup({
          options: new FormArray([]),
          segmentationSelected: new FormControl(null, [Validators.required]),
          conditional: new FormControl(this.segmentationQuery[1].value)
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
}
