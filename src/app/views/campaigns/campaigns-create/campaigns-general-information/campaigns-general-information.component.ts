import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { UsersService } from "@shared/services/users/users.service";
import { takeUntil } from "rxjs";
import { DestroyService } from "@shared/services";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";

@Component({
  selector: 'app-campaigns-general-information',
  templateUrl: './campaigns-general-information.component.html',
  styleUrls: ['./campaigns-general-information.component.scss']
})
export class CampaignsGeneralInformationComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() formGroup: FormGroup;
  @Output() formGroupChange= new EventEmitter<FormGroup>;
  @Input() definitionId: string;
  @Output() definitionIdChange= new EventEmitter<string>();
  assignedUser: any[];
  query: DynamicQueryModel = {
    payload: {},
  };
  campaignType= [
    {
      label:"AutoCall IVR",
      value:"AUTOCALL_IVR"
    },
    {
      label:"AutoCall Predict",
      value:"AUTOCALL_PREDICT"
    },
    {
      label:"Email",
      value:"EMAIL"
    },
    {
      label:"SMS",
      value:"SMS"
    }
  ]
  searchKey: string;

  constructor(
    private usersService: UsersService,
    private destroy: DestroyService,
  ) {

  }

  ngOnInit(): void {
    this.initInput();
  }

  private initInput(): void {
    this.query.currentPage= 1;
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
