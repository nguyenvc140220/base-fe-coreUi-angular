import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-campaigns-contact-data',
  templateUrl: './campaigns-contact-data.component.html',
  styleUrls: ['./campaigns-contact-data.component.scss']
})
export class CampaignsContactDataComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() formGroup: FormGroup;


  dataContactTypes: any[];
  dataContactType: string;

  ngOnInit(): void {
    this.initForm()
    this.dataContactTypes = [{value: "customer-segmentation", label: "Phân khúc khách hàng"}]
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      checkDupPhone: new FormControl(null),
      dataCustomersType: new FormControl(null),
      dataContactType: new FormControl(null)
    })
  }

  eventDataContactType(event) {
    this.dataContactType = event.value
  }
}
