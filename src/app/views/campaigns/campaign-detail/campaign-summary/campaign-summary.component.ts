import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EChartsOption } from "echarts/types/dist/echarts";
import * as moment from 'moment';

@Component({
  selector: 'app-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss']
})
export class CampaignSummaryComponent implements OnInit {

  data: any;
  options_1: EChartsOption;
  options_2: EChartsOption;
  options_3: EChartsOption;
  options_4: EChartsOption;
  options_5: EChartsOption;
  options_6: EChartsOption;

  today = new Date();

  summaryTimes = [
    moment(this.today).set({ date: 1, hour: 0, minutes: 0, second: 0 }).toDate(),
    this.today
  ]

  summaryShow = true;
  dailyCallShow = true;
  callStatusShow = true;
  emailStatusShow = true;
  smsStatusShow = true;
  chart5Show = true;
  chart6Show = true;

  constructor(route: ActivatedRoute) {
    // const {queryParams} = route.snapshot;
  }

  handleRefresh($event: MouseEvent) {

  }

  ngOnInit(): void {
    const data_1 = [
      { name: '10/03', notHandled: 200, handled: 2 },
      { name: '11/03', notHandled: 70, handled: 1 },
      { name: '12/03', notHandled: 1000, handled: 16 },
      { name: '13/03', notHandled: 200, handled: 2 },
      { name: '14/03', notHandled: 500, handled: 11 },
      { name: '15/03', notHandled: 1450, handled: 19 },
      { name: '16/03', notHandled: 2690, handled: 69 },
      { name: '17/03', notHandled: 100, handled: 0 },
      { name: '18/03', notHandled: 311, handled: 2 },
      { name: '19/03', notHandled: 200, handled: 2 },
      { name: '20/03', notHandled: 1245, handled: 41 },
      { name: '21/03', notHandled: 342, handled: 5 },
      { name: '22/03', notHandled: 786, handled: 4 },
      { name: '23/03', notHandled: 875, handled: 10 },
      { name: '24/03', notHandled: 887, handled: 22 },
      { name: '25/03', notHandled: 2145, handled: 72 },
      { name: '26/03', notHandled: 574, handled: 8 },
      { name: '27/03', notHandled: 357, handled: 11 },
      { name: '28/03', notHandled: 1355, handled: 69 },
    ];



    const dialed = `Gọi thành công`;
    const interact = `Hứng thú`;

    this.options_1 = {
      tooltip: {},
      legend: {
        data: [dialed, interact],
        right: 'right',
        bottom: 'center',
      },
      xAxis: {
        data: data_1.map(item => item.name),
      },
      yAxis: {
        type: 'value',
        data: [0, 100000, 200000, 300000, 400000, 500000],
        axisLabel: {
          // interval: 0,
          // rotate: -45,
        },
        axisTick: {
          // alignWithLabel: true
        }
      },
      series: [
        {
          name: dialed,
          type: 'bar',
          data: data_1.map(item => item.notHandled),
          itemStyle: {
            color: '#3557F6'
          },
          barMaxWidth: 36
        },
        {
          name: interact,
          type: 'bar',
          data: data_1.map(item => item.handled),
          itemStyle: {
            color: '#D1DFF4'
          },
          barMaxWidth: 36
        }
      ]
    }

    const data_2 = [
      { name: '10/03', notHandled: 200, handled: 170 },
      { name: '11/03', notHandled: 70, handled: 36 },
      { name: '12/03', notHandled: 1000, handled: 544 },
      { name: '13/03', notHandled: 200, handled: 122 },
      { name: '14/03', notHandled: 500, handled: 234 },
      { name: '15/03', notHandled: 1450, handled: 776 },
      { name: '16/03', notHandled: 2690, handled: 1126 },
      { name: '17/03', notHandled: 100, handled: 4 },
      { name: '18/03', notHandled: 311, handled: 234 },
      { name: '19/03', notHandled: 200, handled: 167 },
      { name: '20/03', notHandled: 1245, handled: 764 },
      { name: '21/03', notHandled: 342, handled: 259 },
      { name: '22/03', notHandled: 786, handled: 475 },
      { name: '23/03', notHandled: 875, handled: 697 },
      { name: '24/03', notHandled: 887, handled: 770 },
      { name: '25/03', notHandled: 2145, handled: 1798 },
      { name: '26/03', notHandled: 574, handled: 355 },
      { name: '27/03', notHandled: 357, handled: 314 },
      { name: '28/03', notHandled: 1355, handled: 766 },
    ];

    this.options_2 = {
      tooltip: {},
      legend: {
        data: ['Thành công', 'Thất bại'],
        right: 'right',
        bottom: 'center',
      },
      xAxis: {
        data: data_2.map(item => item.name),
      },
      yAxis: {
        type: 'value',
        data: [0, 100000, 200000, 300000, 400000, 500000],
        axisLabel: {
          // interval: 0,
          // rotate: -45,
        },
        axisTick: {
          // alignWithLabel: true
        }
      },
      series: [
        {
          name: 'Thành công',
          type: 'bar',
          stack: 'one',
          data: data_2.map(item => item.handled),
          itemStyle: {
            color: '#BF73FB'
          },
          barMaxWidth: 24
        },
        {
          name: 'Thất bại',
          type: 'bar',
          stack: 'one',
          data: data_2.map(item => item.notHandled),
          itemStyle: {
            color: '#73CCF5'
          },
          barMaxWidth: 24
        },
      ]
    }


    const data_3 = [
      { name: '10/03', emails: 200 },
      { name: '11/03', emails: 70 },
      { name: '12/03', emails: 1000 },
      { name: '13/03', emails: 200 },
      { name: '14/03', emails: 500 },
      { name: '15/03', emails: 1450 },
      { name: '16/03', emails: 2690 },
      { name: '17/03', emails: 100 },
      { name: '18/03', emails: 311 },
      { name: '19/03', emails: 200 },
      { name: '20/03', emails: 1245 },
      { name: '21/03', emails: 342 },
      { name: '22/03', emails: 786 },
      { name: '23/03', emails: 875 },
      { name: '24/03', emails: 887 },
      { name: '25/03', emails: 2145 },
      { name: '26/03', emails: 574 },
      { name: '27/03', emails: 357 },
      { name: '28/03', emails: 1355 },
    ];


    this.options_3 = {
      xAxis: {
        type: 'category',
        data: data_3.map(x => x.name),
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        data: ['Email đã gửi'],
        right: 'right',
        bottom: 'center',
      },
      series: [
        {
          data: data_3.map(x => x.emails),
          type: 'line',
          smooth: true
        }
      ]
    }

    this.options_4 = {
      xAxis: {
        type: 'category',
        data: data_3.map(x => x.name)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: data_3.map(x => x.emails),
          type: 'bar'
        }
      ]
    };

    this.options_5 = {
      grid: {
        right: '15%'
      },
      legend: {
        data: ['Cuộc gọi', 'Hứng thú'],
        right: 'right',
        bottom: 'center',
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: data_3.map(x => x.name)
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Hứng thú',
          position: 'right',
          alignTicks: true,
          // offset: 80,
          axisLine: {
            show: true,
            lineStyle: {
              // color: 'green'
            }
          },
          // axisLabel: {
          //   formatter: '{value} VND',
          //   color: undefined
          // }
        },
        {
          type: 'value',
          name: 'Cuộc gọi',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
            lineStyle: {
              // color: 'red'
            }
          },
          axisLabel: {
            // formatter: '{value} cuộc',
            // color: undefined
          }
        }
      ],
      series: [
        {
          name: 'Cuộc gọi',
          type: 'bar',
          yAxisIndex: 1,
          data: data_3.map(x => x.emails)
        },
        {
          name: 'Hứng thú',
          type: 'line',
          yAxisIndex: 0,
          data: data_3.map(x => x.emails * 0.011396948)
        },
      ]
    };

    this.options_6 = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Tổng cuộc gọi', 'Tổng hứng thú'],
        right: 'right',
        bottom: 'center',
      },
      grid: {
        right: '15%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data_3.map(x => x.name)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Tổng cuộc gọi',
          type: 'line',
          stack: 'Total',
          data: data_3.map(x => x.emails)
        },
        {
          name: 'Tổng hứng thú',
          type: 'line',
          stack: 'Total',
          data: data_3.map(x => x.emails * 0.13133345379)
        },
      ]
    };
  }
}
