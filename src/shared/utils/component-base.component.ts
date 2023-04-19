import { Injector } from '@angular/core';
import { PrimengTableHelper } from '@shared/helpers/primeng-table-helper';
import { ConfigService } from '@shared/utils/config.service';

export abstract class ComponentBase<T> {

  domainId: string;
  primengTableHelper: PrimengTableHelper<T>;
  hasActions: boolean = true;

  protected constructor(injector: Injector, configService?: ConfigService) {
    this.primengTableHelper = new PrimengTableHelper();

    this.primengTableHelper.predefinedRecordsCountPerPage = [10, 50, 100, 150];
    this.primengTableHelper.defaultRecordsCountPerPage = 100;
  }
}
