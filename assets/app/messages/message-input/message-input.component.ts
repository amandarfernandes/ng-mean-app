import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "../message.service";
import { Message } from "../message.model";


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    
})
export class MessageInputComponent implements OnInit {

    message:Message
    constructor(private messageService: MessageService) {}
    
    onClear(form:NgForm) {
        if (this.message) {this.message=null;}
        form.resetForm();
    }

    onSave(form: NgForm) {
        console.log(this.message)
        if (!this.message) {
            const newMessage = new Message(form.value.content,'Amanda')
            this.messageService.addMessage(newMessage).subscribe(
                data => console.log(data),
                error => console.log(error)            
            );
        } else {
             this.message.content = form.value.content;
             this.messageService.updateEditedMessage(this.message).subscribe(result=>console.log(result));   
        }

        this.onClear(form);
        
    }
    
    
    ngOnInit() {
        this.messageService.messageUpdated.subscribe(
            (message:Message)=>{
                this.message = message;
            }
        );
    }
}