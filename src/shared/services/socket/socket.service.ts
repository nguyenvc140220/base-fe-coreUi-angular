import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from '@shared/ultils/config.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(
    private readonly socket: Socket,
    private readonly configService: ConfigService
  ) {
    socket = new Socket(configService.socketIOConfig);
    socket.connect();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }
}
