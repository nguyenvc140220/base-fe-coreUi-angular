import { Component, Injector, OnInit } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";

@Component({
  selector: 'app-lead-interaction-table',
  templateUrl: './lead-interaction-table.component.html',
  styleUrls: ['./lead-interaction-table.component.scss']
})
export class LeadInteractionTableComponent extends ComponentBase<any> implements OnInit {

  cols: {
    field: string;
    header: string;
    order?: number;
    styles?: {
      width?: string;
      maxWidth?: string;
      minWidth?: string
    },
    sortable?: boolean
  }[];

  constructor(injector: Injector) {
    super(injector);
  }

  mockData = [
    {
      id: 'id1',
      callStatus: 'Nghe máy',
      selection: 'Phím 1',
      interactTime: [1618834120000, 1618834840000],
      duration: 1618834840000 - 1618834120000,
      recording: ''
    },
    {
      id: 'id1',
      callStatus: 'Nghe máy',
      selection: 'Phím 1',
      interactTime: [1618834120000, 1618834840000],
      duration: 1618834840000 - 1618834120000,
      recording: ''
    },{
      id: 'id1',
      callStatus: 'Nghe máy',
      selection: 'Phím 1',
      interactTime: [1618834120000, 1618834840000],
      duration: 1618834840000 - 1618834120000,
      recording: ''
    }
    ,{
      id: 'id1',
      callStatus: 'Nghe máy',
      selection: 'Phím 1',
      interactTime: [1618834120000, 1618834840000],
      duration: 1618834840000 - 1618834120000,
      recording: ''
    },
    {
      id: 'id1',
      callStatus: 'Nghe máy',
      selection: 'Phím 1',
      interactTime: [1618834120000, 1618834840000],
      duration: 1618834840000 - 1618834120000,
      recording: ''
    }
  ];

  private initDataTable() {
    {
      this.cols = [
        {field: 'callStatus', header: 'Trạng thái gọi', styles: {minWidth: '120px'}},
        {field: 'selection', header: 'Trạng thái trao đổi', styles: {minWidth: '120px'}},
        {field: 'interactTime', header: 'Thời gian bắt đầu/kết thúc', styles: {minWidth: '180px'}},
        {field: 'duration', header: 'Thời lượng', styles: {minWidth: '100px'}},
        {field: 'recording', header: 'Ghi âm', styles: {minWidth: '200px'}},
      ];
    }
  }

  ngOnInit(): void {
    this.initDataTable();

    this.primengTableHelper.records = this.mockData;
  }

}
