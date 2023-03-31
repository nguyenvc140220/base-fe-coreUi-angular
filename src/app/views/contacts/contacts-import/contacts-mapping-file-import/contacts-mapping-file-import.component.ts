import {
  Component,
  EventEmitter, Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import * as XLSX from 'xlsx'
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ContactService } from "@shared/services/contacts/contact.service";
import { DynamicFieldService } from "@shared/services/dynamic-field/dynamic-field.service";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { takeUntil } from "rxjs";
import { DynamicPropertyModel } from "@shared/models/dynamic-field/dynamic-property.model";
import { DestroyService } from "@shared/services";
import Swal from "sweetalert2";
import { ComponentBase } from "@shared/utils/component-base.component";
import { DynamicPropertyRequestModel } from "@shared/models/dynamic-field/dynamic-property-request.model";

@Component({
  selector: 'app-contacts-mapping-file-import',
  templateUrl: './contacts-mapping-file-import.component.html',
  styleUrls: ['./contacts-mapping-file-import.component.scss']
})
export class ContactsMappingFileImportComponent extends ComponentBase<any> implements OnInit, OnDestroy, OnChanges {
  headers: any[];
  sampleData: Object;
  properties: DynamicPropertyModel[];
  dataHeader = {
    tenant: "",
    fileName: "",
    correlationId: "",
    entityType: DynamicEntityTypeEnum.CONTACT,
    headers: {}
  }
  page = 1;
  pageSize = 1000;
  checkHeaderDuplicate = false;

  @Input() numOfRecords: number
  @Input() activeIndex: number
  @Input() file: File
  @Output() activeIndexChange = new EventEmitter<number>()

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
    private contactService: ContactService,
    private dynamicFieldService: DynamicFieldService,
    private destroy: DestroyService,
  ) {
    super(injector)
    breadcrumbStore.items = [{
      label: 'Danh sách liên hệ',
      routerLink: '/contacts',
    }, {
      label: 'Import liên hệ',
    }];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.primengTableHelper.isLoading = true;
    if (this.file) {
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(this.file)
      fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, {type: 'binary', sheetRows: 5},)
        var excelData = XLSX.utils
          .sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
          ?.filter(o => !Object.keys(o).every(k => !o[k].toString().trim()))
        console.log(excelData)
        if (excelData.length > 0) {
          this.headers = Object.keys(excelData[0])
          this.sampleData = excelData[0]
          this.primengTableHelper.isLoading = false;
        }
        if (!excelData.length) {
          Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: `File tải lên không có dữ liệu!!`,
          }).then();
          this.activeIndexChange.emit(0)
          return;
        }
      }
    }
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initProperties(null)
  }

  onFilterEvent(event) {
    this.initProperties(event.filter)
  }

  /**
   * Hardcode lấy 1000 bản ghi để phục vụ việc xử lí check chọn trùng Header.
   */
  initProperties(searchKey: string) {
    let query = new DynamicPropertyRequestModel()
    query.page = this.page;
    query.size = 1000;
    if (searchKey) query.keyword = searchKey
    this.contactService
      .getContactProperties(query).pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.properties = res.data.content
          }
        }
      });
  }

  onChangeProperties(event, headerExcel) {
    console.log(this.properties)
    this.properties.indexOf(event.value)
    const index = this.properties.indexOf(event.value)
    if (index > -1) {
      this.properties.splice(index, 1);
    }
    if (event.value && headerExcel) {
      this.dataHeader.headers[`${headerExcel}`] = {
        "code": event.value.code,
        "dataType": event.value.dataType,
        "validators": {}
      }
    }

  }

  nextStepEnd(event) {
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    if (Object.keys(this.dataHeader.headers).length === 0)
      return Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: `Chưa chọn dữ liệu mapping!!`,
      });


    this.contactService.upLoadFile(formData)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          this.dataHeader.fileName = res.data.filePath;
          this.dataHeader.correlationId = res.data.id;
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `File tải lên thành công!!`,
          })
          this.contactService.addHeaderMapping({
            contactsFileId: res.data.id,
            headerMapping: JSON.stringify(this.dataHeader),
            headers: this.dataHeader
          }).pipe(takeUntil(this.destroy)).subscribe({
            next: (res) => {
              this.activeIndexChange.emit(2)
            }
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: `${err}!!`,
          })
        }
      })
  }

  backStepEnd() {
    this.activeIndexChange.emit(0)
  }
}
