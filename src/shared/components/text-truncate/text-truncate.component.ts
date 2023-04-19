import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from "@angular/core";

@Component({
  selector: 'app-text-truncate',
  template: `
    <div #txt
         class="truncate {{ clazz }}"
         [ngStyle]="style || {}"
         [pTooltip]="tooltip ?? text"
         [tooltipPosition]="tooltipPos || 'right'"
         [tooltipDisabled]="tooltipDisabled">{{ text ?? '' }}</div>
  `,
})
export class TextTruncateComponent implements AfterViewInit {

  @Input("text") text: string;
  @Input("tooltip") tooltip: string;
  @Input("tooltipPos") tooltipPos: ('top' | 'bottom' | 'left' | 'right');
  @Input("style") style;
  @Input("class") clazz: string;

  @ViewChild('txt', {static: false}) txtElementRef: ElementRef;

  tooltipDisabled = true;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.emitTruncate();
    this.cdr.detectChanges();
  }

  @HostListener('window:resize')
  private onResize() {
    this.emitTruncate();
    this.cdr.detectChanges();
  }

  private emitTruncate() {
    this.tooltipDisabled = this.txtElementRef.nativeElement.scrollWidth <= this.txtElementRef.nativeElement.clientWidth;
  }
}
