import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MessageComponent } from "./message-list/message/message.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessagesComponent } from "./messages.component";

import { MessageService } from "./message.service";

@NgModule({
    imports:[
        CommonModule,
        FormsModule
    ],
    declarations:[
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
    ],
    providers: [ MessageService],
})
export class MessagesModule {

}