import { Component, OnInit } from '@angular/core';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DestroyService } from '@shared/services';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DatePipe } from '@angular/common';

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
      label: 'Gộp',
      icon: 'pi pi-sitemap',
      command: () => {
        console.log('Gộp');
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
          {value: 1048, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
          {value: 580, name: 'Email'},
          {value: 484, name: 'Union Ads'},
          {value: 300, name: 'Video Ads'},
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

  contactDefaultField = [
    {field: 'fullName', label: 'Họ và tên'},
    {field: 'email', label: 'Email'},
    {field: 'dob', label: 'Họ và tên'},
    {field: 'gender', label: 'Trạng thái'},
    {field: 'identification', label: 'Quyền'},
    {field: 'province', label: 'Quyền'},
    {field: 'district', label: 'Quyền'},
    {field: 'ward', label: 'Quyền'},
    {field: 'address', label: 'Quyền'},
    {field: 'createSource', label: 'Quyền'},
  ]


  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private dynamicFieldService: DynamicFieldService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    super();
    this.contactId = this.route.snapshot.params['contactId'];
    this.breadcrumbStore.items = [
      {label: 'Danh sách liên hệ', routerLink: ['/contacts']},
      {label: `${this.contactId}`},
    ];
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
            properties[p.code] = p;
          });
          console.log(properties)
          this.contactInfos = [];
          Object.keys(properties).forEach(key => {
            if (entity[key]) {
              this.contactInfos.push({
                title: properties[key].displayName,
                value:
                  properties[key].dataType == DynamicDataTypeEnum.DATETIME
                    ? this.datePipe.transform(entity[key], 'dd/MM/yyyy')
                    : entity[key],
              });
            } else this.contactInfos.push({
              title: properties[key].displayName,
              value: "_",
            });
          })
          console.log(this.contactInfos)
          // Object.keys(entity).forEach((key) => {
          //   if (properties[key]) {
          //     this.contactInfos.push({
          //       title: properties[key].displayName,
          //       value:
          //         properties[key].dataType == DynamicDataTypeEnum.DATETIME
          //           ? this.datePipe.transform(entity[key], 'dd/MM/yyyy')
          //           : entity[key],
          //     });
          //   }
          // });
        }
      });
  }
}
