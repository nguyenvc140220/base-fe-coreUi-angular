import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-campaigns-configuration',
  templateUrl: './campaigns-configuration.component.html',
  styleUrls: ['./campaigns-configuration.component.scss'],
})
export class CampaignsConfigurationComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  createForm: FormGroup;
  dayInWeeks: any[];

  lstDayTypes: FormArray;

  constructor(private fb: FormBuilder) {
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = 'assets/elsa-custom-type.js';
    const node = document.createElement('script');
    node.src = dynamicScripts;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
  }
}
