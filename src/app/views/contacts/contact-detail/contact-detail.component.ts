import { Component, OnInit } from '@angular/core';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DestroyService } from '@shared/services';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EChartsOption } from 'echarts/types/dist/echarts';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent extends DestroyService implements OnInit {
  isLoading = false;
  contactInfos = [];
  contactId = '';

  extendItems = [
    {
      label: 'Sửa',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Sửa');
      },
    },
    {
      label: 'Nhân bản',
      icon: 'pi pi-copy',
      command: () => {
        console.log('Nhân bản');
      },
    },
    {
      label: 'Gán',
      icon: 'pi pi-link',
      command: () => {
        console.log('Gán');
      },
    },
  ];
  options: EChartsOption = {
    title: {
      text: 'Báo cáo thống kê',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private dynamicFieldService: DynamicFieldService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.breadcrumbStore.items = [
      { label: 'Danh sách liên hệ', routerLink: ['/contacts'] },
      { label: 'Chi tiết liên hệ' },
    ];
    this.contactId = this.route.snapshot.params['contactId'];
  }

  ngOnInit() {
    this.dynamicFieldService
      .getDynamicEntity({
        currentPage: 1,
        pageSize: 1,
        payload: {
          field: 'id',
          operator: 'EQ',
          value: this.contactId,
        },
        index: DynamicEntityTypeEnum.CONTACT,
      })
      .pipe(takeUntil(this))
      .subscribe((res) => {
        if (res.statusCode == 200 && res.data && res.data.totalElements > 0) {
          this.printEntityDetail(res.data.content[0]);
        } else {
          this.router.navigate(['/contacts']);
        }
      });
  }

  printEntityDetail(entity) {
    this.dynamicFieldService
      .getDynamicProperties({
        size: 100,
        page: 1,
        type: DynamicEntityTypeEnum.CONTACT,
      })
      .subscribe((res) => {
        if (res.statusCode == 200) {
          var properties = {};
          res.data.content.forEach((p) => {
            properties[p.code] = p.displayName;
          });
          this.contactInfos = [];
          Object.keys(entity).forEach((key) => {
            if (properties[key])
              this.contactInfos.push({
                title: properties[key],
                value: entity[key],
              });
          });
        }
      });
  }
}
