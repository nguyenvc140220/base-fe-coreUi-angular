import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from '@shared/utils/config.service';
import { CampaignInteractionModel } from '@shared/models/campaign/campaign-interaction.model';
import { NotificationImportDoneResponseModel } from "@shared/models/contacts/notification-import-done-response-model";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(
    private socket: Socket,
    private readonly configService: ConfigService
  ) {
    this.socket = new Socket(configService.socketIOConfig);
    this.socket.connect();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getWorkflowInteractionMessage() {
    return this.socket.fromEvent<CampaignInteractionModel>(
      'workflowInteraction'
    );
  }

  getNotificationImportDoneMessage() {
    return this.socket.fromEvent<NotificationImportDoneResponseModel>(
      'notification-import-done'
    );
  }
}
