import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Message } from "./message.model";
import { ErrorService } from '../errors/error.service';

const url = 'http://localhost:3000/message';

@Injectable()
export class MessageService {
    constructor(private http: HttpClient, private errorService: ErrorService) {}

    private messages: Message[]=[];
    messageUpdated = new EventEmitter<Message>();

    editMessage(message: Message) {
        this.messageUpdated.emit(message)
    }

    updateEditedMessage(message:Message) {
        let body = JSON.stringify(message);
        let token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token'): '';
        
        const httpOptions = {
            params: new HttpParams().set('userid', localStorage.getItem('userid')),
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : token
            })
          };
        return this.http
            .patch(url+'/'+message.messageId, body, httpOptions)
               .map((response:any)=>response.obj)
               .catch((error:HttpErrorResponse)=> { 
                    this.errorService.handleError(error);
                    return Observable.throw(error)});
    }

    addMessage(message: Message) {
        let body = JSON.stringify(message);
        let token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token'): '';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : token
            })
          };
                
        return this.http
            .post(url, body, httpOptions)
            .map((response: any)=>{
               const message = new Message(response.obj.content,
                response.obj.user.firstName+' '+response.obj.user.lastName,
                response.obj._id,
                response.obj.user._id);
               this.messages.push(message);
               
               return message;
            })
            .catch((error:HttpErrorResponse)=> { 
                this.errorService.handleError(error);
                return Observable.throw(error)});
    }

    getMessages() {
        return this.http.get<Message[]>(url)
            .map((data:any) => {
                const messages:Message[]=[];
                data.obj.forEach(message=> {
                    let name= message.user.firstName+' '+message.user.lastName;
                    messages.push(new Message(message.content,name,message._id,message.user._id));
                })

                this.messages = messages;
                return messages;
            })
            .catch((error:HttpErrorResponse)=> { 
                this.errorService.handleError(error);
                return Observable.throw(error)});
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        let token = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token'): '';
        const httpOptions = {
            params: new HttpParams().set('userid', localStorage.getItem('userid')),
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : token
            })
          };

        return this.http.delete(url+'/'+message.messageId, httpOptions)
                .map((data:any)=>data)
                .catch((error:HttpErrorResponse)=> { 
                    this.errorService.handleError(error);
                    return Observable.throw(error)});
    }

}