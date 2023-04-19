import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EChartsOption } from "echarts/types/dist/echarts";


@Component({
  selector: 'app-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss']
})
export class CampaignSummaryComponent implements OnInit {

  data: any;
  options_1: EChartsOption;
  options_2: EChartsOption;

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



    const dialed = `Đã gọi`;
    const interact = `Hứng thú`;

    this.options_1 = {
      tooltip: {},
      legend: {
        data: [dialed, interact]
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
        data: ['Thất bại', 'Thành công']
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
          name: 'Thất bại',
          type: 'bar',
          stack: 'one',
          data: data_2.map(item => item.notHandled),
          itemStyle: {
            color: '#BF73FB'
          },
          barMaxWidth: 24
        },
        {
          name: 'Thành công',
          type: 'bar',
          stack: 'one',
          data: data_2.map(item => item.handled),
          itemStyle: {
            color: '#73CCF5'
          },
          barMaxWidth: 24
        }
      ]
    }
  }
}
