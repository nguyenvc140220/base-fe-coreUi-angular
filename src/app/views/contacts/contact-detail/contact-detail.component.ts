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
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as faIcons from '@fortawesome/free-solid-svg-icons';
import { DynamicInputTypeEnum } from "@shared/enums/dynamic-input-type.enum";
import { DynamicModeEnum } from "@shared/enums/dynamic-mode.enum";
import { DEFAULT_COL_CONTACT } from "@shared/constant/contacts.const";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent extends DestroyService implements OnInit {
  isLoading = false;
  contactInfos = [];
  dynamicContactInfos = [];
  contactId = '';
  tapDefault = 0;
  tapDynamic = 2;
  tapDefaultChild = null;
  contact: any
  extendItems = [
    {
      label: 'Sửa',
      icon: 'pi pi-pencil',
      command: () => {
        this.router.navigate(
          [
            'contacts/edit',
            {
              type: DynamicEntityTypeEnum.CONTACT,
              mode: DynamicModeEnum.EDIT,
            },
          ],
          {state: {entity: this.contact}}
        );
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

  showDefaultField = [
    {field: 'fullName', title: 'Họ và tên', value: ""},
    {field: 'phoneNumber', title: 'Số điện thoại', value: ""},
    {field: 'email', title: 'Email', value: ""},
    {field: 'dob', title: 'Ngày sinh', value: ""},
    {field: 'gender', title: 'Giới tính', value: ""},
    {field: 'identification', title: 'CMND/CCCD', value: ""},
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
          this.contact = res.data.content[0]
          this.printEntityDetail(res.data.content[0]);
        } else {
          this.router.navigate(['/contacts']);
        }
      });
  }

  printEntityDetail(entity) {
    console.log(entity)
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
          this.contactInfos = [];
          Object.keys(properties).forEach(key => {
            if (properties[key].removable == false && properties[key].visible) {
              let found = this.showDefaultField.find(element => element.field == key);
              const data = {
                title: properties[key].displayName,
                value: this.checkTypeEntity(properties[key], entity[key]),
                order: DEFAULT_COL_CONTACT[key].order
              }
              found ? found.value = data.value : this.contactInfos.push(data);
            } else if (properties[key].removable == true && properties[key].visible) this.dynamicContactInfos.push({
              title: properties[key].displayName,
              value: this.checkTypeEntity(properties[key], entity[key])
            });
          })

          this.contactInfos.push(
            {
              title: 'Ngày tạo',
              value: this.datePipe.transform(entity['creationTime'], 'dd/MM/yyyy'),
              order: 13
            },
            {
              title: 'Ngày cập nhật gần nhất',
              value: entity['lastModificationTime'] ? this.datePipe.transform(entity['lastModificationTime'], 'dd/MM/yyyy') : '-',
              order: 14
            },
          );
          this.contactInfos.sort((a, b) => a.order - b.order);
        }
      });
  }

  /**
   * @param entity : trường dữ liệu
   * @param value : giá trị trường dữ liệu
   */
  checkTypeEntity(entity: any, value) {
    if (!value) return "-"
    if (entity.dataType == DynamicDataTypeEnum.DATETIME) {
      if (value == 0 || isNaN(value)) return "-"
      const format = entity.inputType == DynamicInputTypeEnum.DATE_PICKER ? 'dd/MM/yyyy' : (
        entity.inputType == DynamicInputTypeEnum.TIME_PICKER ? 'HH:mm:ss' : 'dd/MM/yyyy HH:mm:ss'
      )
      return this.datePipe.transform(value, format)
    } else return value
  }

  icon(iconName): IconDefinition {
    return faIcons[iconName];
  }

  showOrHideAccordionTab(i, name) {
    this[name] = this[name] == i ? null : i;
  }
}
