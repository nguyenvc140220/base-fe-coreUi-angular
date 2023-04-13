import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0
  definitionId : string;
  formGroup: FormGroup;
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
        command: () => {},
      },
      {
        label: 'Data khách hàng',
        command: () => {},
      },
      {
        label: 'Cấu hình',
        command: () => {},
      },
      {
        label: 'Hoàn tất',
        command: () => {},
      }
    ];
    this.initForm();
  }

  saveData(e){
    console.log(this.formGroup.value)
  }

  initForm(){
    this.formGroup = new FormGroup({
      generalInformationFrom: new FormArray([]),
      segmentFrom: new FormArray([]),
    });

    const getGeneralInformationFrom = this.formGroup.get('generalInformationFrom') as FormArray;
    let generalInformationFrom = new FormGroup({
      campaignName: new FormControl(null,[Validators.required]),
      campaignType: new FormControl(null,[Validators.required]),
      assignedUser: new FormControl(null),
      description: new FormControl(null),
    })
    getGeneralInformationFrom.push(generalInformationFrom);

    const getSegmentFrom = this.formGroup.get('segmentFrom') as FormArray;
    let segmentFrom = new FormGroup({
      checkDupPhone: new FormControl(null,[Validators.required]),
      dataContactType: new FormControl(null,[Validators.required])
    })
    getSegmentFrom.push(segmentFrom);
  }
}
