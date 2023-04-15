import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SEGMENTATION_QUERY } from "@shared/constant/campaign.const";

@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0
  definitionId: string;
  formGroup: FormGroup;
  segmentationForm: FormGroup;
  segmentationQuery = SEGMENTATION_QUERY;

  constructor(
    private breadcrumbStore: BreadcrumbStore,
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
    console.log(this.definitionId)
    this.items = [
      {
        label: 'Thông tin chung',
        command: () => {
          this.activeIndex = 0;
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

  saveData(e) {
    if (this.activeIndex == 3) {
      console.log(this.formGroup.value)
    }
  }

  initForm() {
    this.formGroup = new FormGroup({
      campaignName: new FormControl(null, [Validators.required]),
      campaignType: new FormControl(null, [Validators.required]),
      assignedUser: new FormControl(null),
      description: new FormControl(null),
      checkDupPhone: new FormControl(null),
      dataContactType: new FormControl(null, [Validators.required]),
      segmentQuery: new FormControl(null),
      segmentQueryString: new FormControl(null),
    });

    this.segmentationForm = new FormGroup({
      segmentations: new FormArray([
        new FormGroup({
          options: new FormArray([]),
          segmentationSelected: new FormControl(null, [Validators.required]),
          conditional: new FormControl(this.segmentationQuery[1].value)
        })
      ]),
    });
  }

}
