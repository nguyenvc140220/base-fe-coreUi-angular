import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '@shared/utils/config.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TestCampaignComponent } from '../../test-campaign/test-campaign.component';

@Component({
  selector: 'app-campaigns-configuration',
  templateUrl: './campaigns-configuration.component.html',
  styleUrls: ['./campaigns-configuration.component.scss'],
})
export class CampaignsConfigurationComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  visible: boolean;
  serverId = '';
  data: SafeHtml;
  constructor(
    private sanitizer: DomSanitizer,
    configService: ConfigService,
    private dialogService: DialogService
  ) {
    this.serverId = configService.workflowManagerUrl;
  }

  loadScripts() {
    const dynamicScripts = 'assets/elsa-custom-type.js';
    const node = document.createElement('script');
    node.src = dynamicScripts;
    node.type = 'text/javascript';
    node.async = false;
    document.head.appendChild(node);
  }

  ngOnInit(): void {
    this.data = this.sanitizer.bypassSecurityTrustHtml(`
    <elsa-studio-root server-url="${this.serverId}" monaco-lib-path="assets/monaco" config="assets/elsa-workflows-studio/assets/designer.config.json">
      <elsa-workflow-definition-editor-screen workflow-definition-id="${this.definitionId}">
      </elsa-workflow-definition-editor-screen>
    </elsa-studio-root>`);
    this.loadScripts();
  }
  showDialog() {
    const dialog = this.dialogService.open(TestCampaignComponent, {
      header: 'Chạy thử kịch bản',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { definitionId: this.definitionId },
    });
  }
}
