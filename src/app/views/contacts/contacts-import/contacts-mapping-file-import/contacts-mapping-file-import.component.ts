import {
  Component,
  EventEmitter,
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

@Component({
  selector: 'app-contacts-mapping-file-import',
  templateUrl: './contacts-mapping-file-import.component.html',
  styleUrls: ['./contacts-mapping-file-import.component.scss']
})
export class ContactsMappingFileImportComponent implements OnInit, OnDestroy, OnChanges {
  value = 0;
  numOfSuccess = 0;
  fileName: string;
  headers: any[];
  sampleData: Object;
  properties: DynamicPropertyModel[];
  dataHeader = {
    tenant: "",
    fileName: "",
    correlationId: "",
    entityType: DynamicEntityTypeEnum.CONTACT,
    header: {}
  }
  page = 1;
  pageSize = 10;
  searchKey: string | null

  @Input() numOfRecords: number
  @Input() activeIndex: number
  @Input() file: File
  @Output() activeIndexChange = new EventEmitter<number>()

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private contactService: ContactService,
    private dynamicFieldService: DynamicFieldService,
    private destroy: DestroyService,
  ) {
    breadcrumbStore.items = [{
      label: 'Danh sách liên hệ',
      routerLink: '/contacts',
    }, {
      label: 'Import liên hệ',
    }];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.numOfRecords)
    console.log(this.file)
    if (this.file) {
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(this.file)
      fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, {type: 'binary'})
        var excelData = XLSX.utils
          .sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
          ?.filter(o => !Object.keys(o).every(k => !o[k].toString().trim()))
        console.log(excelData)
        if (excelData.length > 0) {
          this.headers = Object.keys(excelData[0])
          this.sampleData = excelData[0]
          console.log(this.headers)
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

  initProperties(searchKey: string) {
    this.contactService
      .getContactProperties({
        page: this.page,
        size: this.pageSize,
      }).pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.properties = res.data.content
          }
        }
      });
  }

  onChangeProperties(event, headerExcel) {
    console.log(event)
    if (event.value && headerExcel) {
      let checkExist = Object.keys(this.dataHeader.header).find(key => key == headerExcel)
      if (checkExist) {
        return event.value = "";
      }
      this.dataHeader.header[`${headerExcel}`] = {
        "code": event.value.code,
        "dataType": event.value.dataType,
        "validators": {}
      }
    }
  }

  nextStepEnd(event) {
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    this.contactService.upLoadFile(formData)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res) => {
          this.dataHeader.fileName = res.data.filePath;
          this.dataHeader.correlationId = res.data.id;
          this.contactService.addHeaderMapping({
            contactsFileId: res.data.id,
            headerMapping: JSON.stringify(this.dataHeader),
            headers: this.dataHeader
          })
            .pipe(takeUntil(this.destroy))
            .subscribe({
              next: (res) => {
                console.log(res)
              }
            });
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

}
