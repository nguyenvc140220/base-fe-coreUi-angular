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
  createForm: FormGroup;
  dayInWeeks: any[];

  lstDayTypes: FormArray;

  constructor(private fb: FormBuilder) {
    this.loadScripts();
  }

  loadScripts() {
    const dynamicScripts = 'assets/elsa-workflows-studio/elsa-custom-type.js';
    const node = document.createElement('script');
    node.src = dynamicScripts;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
    this.dayInWeeks = [
      { dayOfWeek: 'Thứ 2', checked: true, value: 1 },
      { dayOfWeek: 'Thứ 3', checked: true, value: 2 },
      { dayOfWeek: 'Thứ 4', checked: true, value: 3 },
      { dayOfWeek: 'Thứ 5', checked: true, value: 4 },
      { dayOfWeek: 'Thứ 6', checked: true, value: 5 },
      { dayOfWeek: 'Thứ 7', checked: true, value: 6 },
      { dayOfWeek: 'Chủ nhật', checked: true, value: 7 },
    ];

    this.createForm = new FormGroup({
      lstDayTypes: new FormArray([]),
      groupName: new FormControl('Khung giờ'),
    });

    const lstDT = this.createForm.get('lstDayTypes') as FormArray;

    this.dayInWeeks.forEach((ws) => {
      let fas = new FormArray([]);

      if (ws.checked) {
        let fg = new FormGroup({
          from: new FormControl(
            new Date('01-01-1970 08:00'),
            Validators.required
          ),
          to: new FormControl(
            new Date('01-01-1970 17:00'),
            Validators.required
          ),
        });
        fas.push(fg);
      }

      let fgDw = new FormGroup({
        lstShift: fas,
        dayOfWeek: new FormControl(ws.dayOfWeek, Validators.required),
        checked: new FormControl(ws.checked),
        dayValue: new FormControl(ws.value),
      });

      lstDT.push(fgDw);
    });
  }
}
