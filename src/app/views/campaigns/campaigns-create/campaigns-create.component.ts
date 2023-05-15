import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { SEGMENTATION_QUERY } from "@shared/constant/campaign.const";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { Subject, takeUntil } from "rxjs";
import { CreateCampaignRequestModel } from "@shared/models/campaign/create-campaign-request.model";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { DynamicFilterTypeEnum } from "@shared/enums/dynamic-filter-type.enum";
import { ContactService } from "@shared/services/contacts/contact.service";
import { DatePipe } from '@angular/common';
import { DynamicModeEnum } from "@shared/enums/dynamic-mode.enum";
import { UsersService } from "@shared/services/users/users.service";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";

@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0
  definitionId: string;
  campaignMode: string;
  campaignsGeneralForm: FormGroup;
  segmentationForm: FormGroup;
  segmentationQuery = SEGMENTATION_QUERY;
  query: DynamicQueryModel = {
    payload: {},
  };
  totalContactsCount = 0
  campaignDetail: any;
  assignedUser = [];
  segmentations = []
  private unsubscribe = new Subject();

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private readonly messageService: MessageService,
    private readonly campaignService: CampaignService,
    private readonly contactService: ContactService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private segmentationService: SegmentationService
  ) {
    breadcrumbStore.items = [{
      label: 'Chiến dịch',
      routerLink: '/campaigns',
    }];
    this.campaignMode = this.activatedRoute.snapshot.paramMap['params']['mode'];
    if (this.campaignMode == DynamicModeEnum.EDIT) {
      this.campaignDetail = this.router.getCurrentNavigation().extras.state['campaign'];
      this.definitionId = this.campaignDetail['workflowId']
      this.breadcrumbStore.items.push(
        {
          label: `${this.campaignDetail['name']}`,
          routerLink: ['campaigns/details/' + this.campaignDetail['id']]
        },
        {label: 'Sửa chiến dịch'}
      );
    } else {
      this.definitionId = this.router.getCurrentNavigation().extras.state['definitionId'];
      this.breadcrumbStore.items.push({label: 'Thêm mới chiến dịch'});
    }
  }


  ngOnInit() {
    this.items = [
      {
        label: 'Thông tin chung',
        icon: '',
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
          this.query = {};
          if (this.segmentationForm.valid) {
            this.handlFromSegment()
          }
        },
      }
    ];
    this.usersService
      .getUsers({currentPage: 1, pageSize: 1000})
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.assignedUser = res.data.content;
          }
        }
      });
    this.segmentationService
      .getSegmentations(
        '',
        1,
        1000
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: PageResponse<SegmentationListModel>) => {
          this.segmentations = res.data.content;
          this.initForm();
        }
      })

  }

  btnSaveOrNext() {
    this.campaignsGeneralForm.valid ? this.checkValidStepSuccess(0) : this.checkValidStepFailed(0);
    this.segmentationForm.valid ? this.checkValidStepSuccess(1) : this.checkValidStepFailed(1);

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
        body.workflowId = this.definitionId;
        body.agentIds = agentIds.toString();
        body.description = this.campaignsGeneralForm.value.description?.trim()
        body.startCallTime = this.campaignsGeneralForm.value.startCallTime
        body.endCallTime = this.campaignsGeneralForm.value.endCallTime
        body.timeFrom = this.datePipe.transform(this.campaignsGeneralForm.value.timeFrom, 'HH:mm');
        body.timeTo = this.datePipe.transform(this.campaignsGeneralForm.value.timeTo, 'HH:mm');
        body.customerType = this.segmentationForm.value.dataContactType
        body.segmentQuery = JSON.stringify(this.query);
        if (this.campaignMode == 'EDIT') {
          body.id = this.campaignDetail['id'];
          this.campaignService.updateCampaign(body).pipe(takeUntil(this.unsubscribe)).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Thành công',
                detail: `Cập nhật thành công!`,
              });
              return this.router.navigate(['campaigns']);
            }
          });
        } else this.campaignService.createCampaign(body).pipe(takeUntil(this.unsubscribe)).subscribe({
          next: () => {
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

  onActiveIndexChange() {
    this.campaignsGeneralForm.valid ? this.checkValidStepSuccess(0) : this.checkValidStepFailed(0);
    this.segmentationForm.valid ? this.checkValidStepSuccess(1) : this.checkValidStepFailed(1);
  }

  initForm() {
    this.campaignsGeneralForm = new FormGroup({
      name: new FormControl(null, [Validators.required, validatorTrim]),
      assignedUser: new FormControl(null),
      startCallTime: new FormControl(new Date(), [Validators.required]),
      endCallTime: new FormControl(new Date(), [Validators.required]),
      timeFrom: new FormControl(null, [Validators.required]),
      timeTo: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
    });
    this.segmentationForm = new FormGroup({
      checkDupPhone: new FormControl(null),
      dataContactType: new FormControl(null, [Validators.required]),
      segmentations: new FormArray([
        new FormGroup({
          segmentationSelected: new FormControl(null, [Validators.required]),
          query: new FormControl(this.segmentationQuery[1].value)
        })
      ]),
    });
    if (this.campaignMode == 'EDIT') {
      if (this.campaignDetail['agentIds']) {
        let agentIds = this.campaignDetail['agentIds'].split(',');
        let agents = []
        agentIds.length > 0 ?? agentIds.forEach(id => {
          agents.push(this.assignedUser.find(x => x.id == id))
        })
        this.campaignsGeneralForm.controls['assignedUser'].patchValue(agents);
      }
      this.campaignsGeneralForm.controls['name'].patchValue(this.campaignDetail['name']);
      this.campaignsGeneralForm.controls['startCallTime'].patchValue(new Date(this.campaignDetail['intendStartTime']));
      this.campaignsGeneralForm.controls['endCallTime'].patchValue(new Date(this.campaignDetail['intendEndTime']));
      this.campaignsGeneralForm.controls['timeFrom'].patchValue(new Date(this.campaignDetail['timeFrom']));
      this.campaignsGeneralForm.controls['timeTo'].patchValue(new Date(this.campaignDetail['timeTo']));
      this.campaignsGeneralForm.controls['description'].patchValue(this.campaignDetail['description']);
      this.segmentationForm.controls['dataContactType'].patchValue(this.campaignDetail['segmentations']);

      const obj = JSON.parse(this.campaignDetail['segmentQuery']);
      if (obj['payload'] && obj['payload']['payload'] && obj['payload']['payload'].length > 0) {
        let getForm = this.segmentationForm.get('segmentations') as FormArray;
        getForm.removeAt(0);
        obj['payload']['payload'].forEach(el => {
          let formGroupSegmentation = new FormGroup({
            segmentationSelected: new FormControl(null, [Validators.required]),
            query: new FormControl(el['type'])
          })
          let segmentationSelected = []
          el['payload'].forEach(payload => {
            segmentationSelected.push(this.segmentations.find(segmentations => segmentations.name == payload.value));
          })
          formGroupSegmentation.controls['segmentationSelected'].patchValue(segmentationSelected);
          getForm.push(formGroupSegmentation)
        })
      }
    }
  }

  checkValidStepSuccess(i) {
    const steps_number = document.getElementsByClassName('p-steps-number');
    const steps_title = document.getElementsByClassName('p-steps-title ');
    steps_number[i].setAttribute('style', 'color: #1B5E20; background: #E8F5E9;');
    steps_title[i].setAttribute('style', 'color: #1B5E20;');
  }

  checkValidStepFailed(i) {
    const steps_number = document.getElementsByClassName('p-steps-number');
    const steps_title = document.getElementsByClassName('p-steps-title ');
    steps_number[i].setAttribute('style', 'color: #495057; background: #ffffff;');
    steps_title[i].setAttribute('style', 'color: #6c757d;');
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
    const regex = new RegExp('^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\/\-\/\-\\s]*$');
    if (control.value && !regex.test(trimName)) return {'pattern': true};
    return null;
  }
  return null;
}
