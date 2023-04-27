import { Component, EventEmitter, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { DYNAMIC_PROPERTY_TYPE, DynamicTypeEnum } from '@shared/enums/dynamic-data-type.const';
import { DynamicFormBuilder } from '@shared/services/dynamic-field/dynamic-form-builder';
import { range } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicFieldService } from "@shared/services/dynamic-field/dynamic-field.service";
import { DynamicPropertyCreateModel } from "@shared/models/dynamic-field/dynamic-property-create.model";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { DynamicPropertyAddToEntityModel } from "@shared/models/dynamic-field/dynamic-property-add-to-entity.model";

@Component({
  selector: 'app-dynamic-property-create',
  templateUrl: './dynamic-property-create.component.html',
  styleUrls: ['./dynamic-property-create.component.scss'],
})
export class DynamicPropertyCreateComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  formArray = this.fb.group({
    // listOptions : this.fb.array([]),
    // allowAddData: [false, []]
  });
  isLoading = false;
  properties: DynamicPropertyModel[] = [];
  dynamicType: DynamicEntityTypeEnum;
  constructor(
    private fb:FormBuilder,
    private dynamicFormBuilder: DynamicFormBuilder,
    private ref: DynamicDialogRef,
    private dynamicFieldService: DynamicFieldService,
    private config: DynamicDialogConfig,
    )
  {
    this.dynamicType = config.data['type'];
  }

  get listOptions() {
    return this.formArray.controls['listOptions'] as FormArray;
  }
  addOptions(){
    const option = this.fb.group({
      value: [null, [Validators.required]],
    });

    this.listOptions.push(option);
  }
  removeOption(index){
    this.listOptions.removeAt(index);
  }

  showError(index){
    let control = this.listOptions?.controls[index]?.get('value');
    if (control && control.invalid && control.touched) {
      if (control?.errors?.required) return 'Không được bỏ trống!';
    }
    return null;
  }
  convertTextToSlugAndCamelCase(str) {
    str = str.toLowerCase();

    // xóa dấu
    str = str
      .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    str = str.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');

    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  createDynamicPropertyCreateRequest() : DynamicPropertyCreateModel
  {
    const dynamicCreateRequest = new DynamicPropertyCreateModel();
    const dataType =  this.dynamicFormBuilder.getFormValue(this.formGroup, 'dataType') as DynamicTypeEnum;
    dynamicCreateRequest.displayName = this.dynamicFormBuilder.getFormValue(this.formGroup, 'displayName');
    dynamicCreateRequest.code = this.convertTextToSlugAndCamelCase(dynamicCreateRequest.displayName);
    dynamicCreateRequest.tooltip = this.dynamicFormBuilder.getFormValue(this.formGroup, 'tooltip');
    dynamicCreateRequest.hintText = this.dynamicFormBuilder.getFormValue(this.formGroup, 'hintText');
    dynamicCreateRequest.editable = this.dynamicFormBuilder.getFormValue(this.formGroup, 'editable') ?? false;
    switch (dataType){
      case DynamicTypeEnum.TEXT:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.TEXT;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.TEXT_BOX;
        const max_length = this.dynamicFormBuilder.getFormValue(this.formGroup, 'maxLength');
        if(max_length)
          dynamicCreateRequest.validators = `[{"type":"string_length_max","validatorValue":"${max_length}"}]`;
        break;
      case DynamicTypeEnum.EMAIL:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.TEXT;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.EMAIL;
        dynamicCreateRequest.validators = `[{"type":"string_pattern","validatorValue":"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}]`;
        break;
      case DynamicTypeEnum.PHONE_NUMBER:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.TEXT;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.PHONE_NUMBER;
        dynamicCreateRequest.validators = `[{"type":"string_length_min","validatorValue":"10"},{"type":"string_length_max","validatorValue":"12"},{"type":"string_pattern","validatorValue":"\\\\d+"}]`;
        break;
      case DynamicTypeEnum.NUMBER:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.NUMBER;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.NUMBER_BOX;
        break;
      case DynamicTypeEnum.DATE:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.DATETIME;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.DATE_PICKER;
        break;
      case DynamicTypeEnum.DATETIME:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.DATETIME;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.DATETIME_PICKER;
        break;
      case DynamicTypeEnum.TIME:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.DATETIME;
        dynamicCreateRequest.inputType = DynamicInputTypeEnum.TIME_PICKER;
        break;
      case DynamicTypeEnum.CHECKLIST:
      case DynamicTypeEnum.RADIO:
      case DynamicTypeEnum.DROPLIST:
        dynamicCreateRequest.dataType = DynamicDataTypeEnum.LIST;
        dynamicCreateRequest.configurationable = this.dynamicFormBuilder.getFormValue(this.formArray, 'allowAddData') ?? false;
        dynamicCreateRequest.defaultValue = JSON.stringify(this.dynamicFormBuilder.getFormValue(this.formArray, 'listOptions')?.map(a => {
          return {
            value: a.value,
            label: a.value
          }
        }) ?? []);
        if(dataType == DynamicTypeEnum.CHECKLIST){
          dynamicCreateRequest.inputType = DynamicInputTypeEnum.CHECK_LIST;
        } else if(dataType == DynamicTypeEnum.RADIO){
          dynamicCreateRequest.inputType = DynamicInputTypeEnum.RADIO;
        }else{
          dynamicCreateRequest.inputType = this.dynamicFormBuilder.getFormValue(this.formGroup, 'selectType');
        }
        break;
      default:
        break;
    }
    return dynamicCreateRequest;
  }
  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        if(this.formArray.valid && this.formGroup.valid){
          this.isLoading = true;
          const request = this.createDynamicPropertyCreateRequest();
          this.dynamicFieldService.createDynamicProperty(
            request
          ).subscribe({
            next: (res)=>{
              if(res.statusCode === 200)
                this.dynamicFieldService.addPropertyToDynamicType(
                  new DynamicPropertyAddToEntityModel(
                    this.dynamicType,
                    [request.code]
                  )
                ).subscribe({
                  next: (res) => {
                    this.isLoading = false;
                    this.ref.close(true);
                  },
                  error: (err) => {
                    this.isLoading = false;
                  }
                });
              else
                this.isLoading = false;
            },
            error: (err)=>{
              this.isLoading = false;
            }
          });
        }
        break;
      default:
        this.ref.close();
        break;
    }
  }

  generateNumberValue(){
    const values = [];
    range(0,10).forEach((num)=> {
      values.push({
        label: `${num}`,
        value: num,
      })
    });
    return values;
  }

  eventEmiter = new EventEmitter<DynamicTypeEnum>();

  ngOnInit(): void {
    this.properties = [
      new DynamicPropertyModel({
        code: 'displayName',
        displayName: 'Tên trường thông tin',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tên trường thông tin ...',
        validators: [{ type: 'required', validatorValue: '1' }]
      }),
      new DynamicPropertyModel({
        code: 'tooltip',
        displayName: 'Tooltip',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tooltip ...',
      }),
      new DynamicPropertyModel({
        code: 'hintText',
        displayName: 'PlaceHolder',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập Placeholder ...',
      }),
      new DynamicPropertyModel({
        code: 'dataType',
        displayName: 'kiểu dữ liệu',
        dataType: DynamicDataTypeEnum.LIST,
        inputType: DynamicInputTypeEnum.SINGLE_SELECT,
        defaultValue: JSON.stringify(DYNAMIC_PROPERTY_TYPE),
        hintText: 'Chọn kiểu dữ liệu',
        validators: [{ type: 'required', validatorValue: '1' }],
        onDataChange: (data) => this.eventEmiter.emit(data)
      }),
      new DynamicPropertyModel({
        code: 'editable',
        displayName: 'Dạng dữ liệu',
        dataType: DynamicDataTypeEnum.BOOLEAN,
        inputType: DynamicInputTypeEnum.CHECKBOX,
        hintText: 'Có thể sửa',
      }),
      new DynamicPropertyModel({
        code: 'maxLength',
        displayName: 'Độ dài tối đa [250]',
        dataType: DynamicDataTypeEnum.NUMBER,
        inputType: DynamicInputTypeEnum.NUMBER_BOX,
        validators: [
          { type: 'double_min', validatorValue: '1' },
          { type: 'double_max', validatorValue: '250' }
        ],
        tag: 'TEXT',
      }),
      new DynamicPropertyModel({
        code: 'minValue',
        displayName: 'Giá trị tối thiểu',
        dataType: DynamicDataTypeEnum.NUMBER,
        inputType: DynamicInputTypeEnum.NUMBER_BOX,
        validators: [
          { type: 'double_min', validatorValue: '-999999999999999' },
          { type: 'double_max', validatorValue: '999999999999999' }
        ],
        tag: 'NUMBER',
        hidden: true
      }),
      new DynamicPropertyModel({
        code: 'maxValue',
        displayName: 'Giá trị tối đa',
        dataType: DynamicDataTypeEnum.NUMBER,
        inputType: DynamicInputTypeEnum.NUMBER_BOX,
        validators: [
          { type: 'double_min', validatorValue: '-999999999999999' },
          { type: 'double_max', validatorValue: '999999999999999' }
        ],
        tag: 'NUMBER',
        hidden: true
      }),
      new DynamicPropertyModel({
        code: 'floatingPoint',
        displayName: 'Làm tròn đến số thập phân',
        dataType: DynamicDataTypeEnum.LIST,
        inputType: DynamicInputTypeEnum.SINGLE_SELECT,
        defaultValue: JSON.stringify(this.generateNumberValue()),
        tag: 'NUMBER',
        hidden: true
      }),
      new DynamicPropertyModel({
        code: 'unit',
        displayName: 'Đơn vị',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập đơn vị ...',
        tag: 'NUMBER',
        hidden: true
      }),
      new DynamicPropertyModel({
        code: 'selectType',
        displayName: 'Cấu hình trường chọn',
        dataType: DynamicDataTypeEnum.LIST,
        inputType: DynamicInputTypeEnum.RADIO,
        defaultValue: JSON.stringify([
          {
            label: "Chọn một",
            value: DynamicInputTypeEnum.SINGLE_SELECT,
          },
          {
            label: "Chọn nhiều",
            value: DynamicInputTypeEnum.MULTI_SELECT
          }
        ]),
        validators: [{ type: 'required', validatorValue: '1' }],
        tag: 'LIST',
        hidden: true
      }),
    ];
    this.eventEmiter.subscribe((e)=>this.onDataChange(e));
    this.formGroup = this.dynamicFormBuilder.generateFormGroup(
      this.formGroup,
      this.properties
    );
  }

  onDataChange(e){
    switch (e){
      case DynamicTypeEnum.TEXT:
        this.properties?.filter(p=> p.tag == 'TEXT')?.forEach(p => p.hidden = false);
        this.properties?.filter(p=> p.tag == 'NUMBER')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'LIST')?.forEach(p => p.hidden = true);
        this.formArray = this.fb.group({});
        break;
      case DynamicTypeEnum.NUMBER:
        this.properties?.filter(p=> p.tag == 'TEXT')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'LIST')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'NUMBER')?.forEach(p => p.hidden = false);
        this.formArray = this.fb.group({});
        break;
      case DynamicTypeEnum.CHECKLIST:
      case DynamicTypeEnum.RADIO:
      case DynamicTypeEnum.DROPLIST:
        this.properties?.filter(p=> p.tag == 'TEXT')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'NUMBER')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'LIST')?.forEach(p => p.hidden = false);
        this.formArray.addControl('listOptions' , this.fb.array([]));
        this.formArray.addControl('allowAddData' , this.fb.control(false,[]));
        if(e == DynamicTypeEnum.CHECKLIST){
          this.formGroup?.controls['selectType']?.setValue(DynamicInputTypeEnum.MULTI_SELECT);
          this.formGroup?.controls['selectType']?.disable();
        } else if(e == DynamicTypeEnum.RADIO){
          this.formGroup?.controls['selectType']?.setValue(DynamicInputTypeEnum.SINGLE_SELECT);
          this.formGroup?.controls['selectType']?.disable();
        }else{
          this.formGroup?.controls['selectType']?.setValue(DynamicInputTypeEnum.SINGLE_SELECT);
          this.formGroup?.controls['selectType']?.enable();
        }
        break;
      default:
        this.properties?.filter(p=> p.tag == 'TEXT')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'NUMBER')?.forEach(p => p.hidden = true);
        this.properties?.filter(p=> p.tag == 'LIST')?.forEach(p => p.hidden = true);
        this.formArray = this.fb.group({});
    }
  }

}
