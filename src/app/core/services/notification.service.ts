import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private message: NzMessageService) {}

  createMessage(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading',
    message: string
  ) {
    switch (type) {
      case 'success':
        return this.message.success(message);
      case 'warning':
        return this.message.warning(message);
      case 'error':
        return this.message.error(message);
      case 'loading':
        return this.message.loading(message);
      case 'info':
        return this.message.info(message);
    }
  }
}
