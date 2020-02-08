import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskSocketService extends Socket {

  constructor() {
    super({
      url: environment.socketUrl, options: {
        // origin: 'http://localhost:4200',
        transport: ['websocket'],
        origin: '*',
        // withCredentials: false
      }
    });
  }

  public dispatch(messageType: string, payload: any): void {
    this.emit(messageType, payload);
  }

  public subscribeToMessage(messageType: string): Observable<any> {
    return this.fromEvent(messageType);
  }
}
