import { NgModule } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { TextTruncateComponent } from "@shared/components/text-truncate/text-truncate.component";
import { NgStyle } from "@angular/common";

@NgModule({
  declarations: [TextTruncateComponent],
  imports: [TooltipModule, NgStyle],
  exports: [TextTruncateComponent],
})
export class TextTruncateModule {

}
