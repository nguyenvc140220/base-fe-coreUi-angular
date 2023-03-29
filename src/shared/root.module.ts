import { NgModule } from '@angular/core';
import { GetButtonStatusPipe } from '@shared/pipes/get-button-status.pipe';

const PIPES = [GetButtonStatusPipe];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
  providers: [],
})
export class CoreModule {}
