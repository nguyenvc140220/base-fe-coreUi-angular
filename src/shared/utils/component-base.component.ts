import { Injector } from '@angular/core';
import { PrimengTableHelper } from '@shared/helpers/primeng-table-helper';
import { ConfigService } from '@shared/utils/config.service';

export abstract class ComponentBase<T> {
  primengTableHelper: PrimengTableHelper<T>;
  domainId: string;
  protected constructor(injector: Injector, configService?: ConfigService) {
    this.primengTableHelper = new PrimengTableHelper();
  }
}
