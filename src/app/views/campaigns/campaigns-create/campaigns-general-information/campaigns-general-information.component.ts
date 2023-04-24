import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { UsersService } from "@shared/services/users/users.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@shared/services";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { CAMPAIGN_TYPE } from "@shared/constant/campaign.const";

@Component({
  selector: 'app-campaigns-general-information',
  templateUrl: './campaigns-general-information.component.html',
  styleUrls: ['./campaigns-general-information.component.scss']
})
export class CampaignsGeneralInformationComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() campaignsGeneralForm: FormGroup;
  @Output() campaignsGeneralFormChange = new EventEmitter<FormGroup>;
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  assignedUser: any[];
  query: DynamicQueryModel = {
    payload: {},
  };
  campaignType = CAMPAIGN_TYPE;
  searchKey: string;
  minDate: Date;
  maxDate: Date;
  minHour: Date;
  maxHour: Date;

  constructor(
    private usersService: UsersService,
    private destroy: DestroyService,
  ) {

  }

  ngOnInit(): void {
    this.initInput();
    this.minDate = this.campaignsGeneralForm.value.startCallTime ?? null
    this.maxDate = this.campaignsGeneralForm.value.endCallTime ?? null
    this.minHour = this.campaignsGeneralForm.value.timeFrom ?? new Date('05-18-2023 05:00');
    this.maxHour = this.campaignsGeneralForm.value.timeTo ?? new Date('05-18-2023 18:00');
  }

  private initInput(): void {
    this.query.currentPage = 1;
    this.query.pageSize = 1000;
    this.usersService
      .getUsers(this.query)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.assignedUser = res.data.content;
          }
        }
      });
  }
}
