import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-campaigns-contact-data',
  templateUrl: './campaigns-contact-data.component.html',
  styleUrls: ['./campaigns-contact-data.component.scss']
})
export class CampaignsContactDataComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() formGroup: FormGroup;
  @Output() formGroupChange= new EventEmitter<FormGroup>;
  @Input() definitionId: string;
  @Output() definitionIdChange= new EventEmitter<string>();

  dataContactTypes: any[];
  dataContactType: string;

  ngOnInit(): void {
    this.dataContactTypes = [{value: "customer-segmentation", label: "Phân khúc khách hàng"}]
  }

  eventDataContactType(event) {
    this.dataContactType = event.value
  }
}
