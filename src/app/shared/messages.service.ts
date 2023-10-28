import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable ,  Subject } from 'rxjs';
import {Message, MessageService} from 'primeng/api';
import * as _ from "lodash";

@Injectable()
export class MessagesService {

  private messages = new Subject<Message>();
  private successMessage = new Subject<Message>();
  private keepAfterRouteChange = false;

  
    constructor(private messageService: MessageService) {}

    showSuccess(msg:string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    showInfo(msg:string) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: msg });
    }

    showWarn(msg:string) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: msg });
    }

    showError(msg:string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    }

}
