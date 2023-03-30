import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FileUpload } from "primeng/fileupload";
import * as XLSX from 'xlsx'
import Swal from "sweetalert2";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ContactService } from "@shared/services/contacts/contact.service";
import { PropertyModel } from "@shared/models/contacts/properties-response-model";
import { ComponentBase } from "@shared/utils/component-base.component";

@Component({
  selector: 'app-contacts-mapping-file-import',
  templateUrl: './contacts-mapping-file-import.component.html',
  styleUrls: ['./contacts-mapping-file-import.component.scss']
})
export class ContactsMappingFileImportComponent extends ComponentBase<any> implements OnInit, OnDestroy, OnChanges {
  value = 0;
  numOfSuccess = 0;
  fileName: string;
  headers: any[];
  sampleData: Object;
  properties: PropertyModel[];
  data = {
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
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
    private contactService: ContactService
  ) {
    super(injector);
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
    this.contactService.getProperties(this.page, this.pageSize, this.searchKey).subscribe({
      next: (res) => {
        this.properties = res.data.content
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  onChangeProperties(event, headerExcel) {
    console.log(event)
    if (event.value && headerExcel) {

      this.data.header[`${headerExcel}`] = {
        "code": event.value.code,
        "dataType": event.value.dataType,
        "validators": {}
      }
      console.log(this.data)
    }
  }

  nextStepEnd(event) {
    // let formData = new FormData();
    // formData.append("file", this.file);
    // this.contactService.upLoadFile(this.file).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })

    let formData = new FormData();
    formData.append("file", this.file, this.file?.name);
    this.contactService.upLoadFile(formData)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

}
