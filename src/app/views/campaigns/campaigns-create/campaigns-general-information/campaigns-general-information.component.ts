import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
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
  assignedUser: any[];
  searchKey: string;
  query: DynamicQueryModel = {
    payload: {},
  };
  constructor(
    private usersService: UsersService,
    private destroy: DestroyService,
  ) {

  }

  ngOnInit(): void {
    this.initForm();
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

  private initForm(): void {
    this.formGroup = new FormGroup({
      campaignName: new FormControl(null),
      campaignType: new FormControl(null),
      assignedUser: new FormControl(null),
      phone: new FormControl(null),
      roles: new FormControl(null),
      enable: new FormControl(true),
    })
  }

  filterUser(event) {
    this.assignedUser = [];
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
