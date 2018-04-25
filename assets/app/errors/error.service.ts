import { EventEmitter } from "@angular/core";
import { Error } from "./error.model";

export class ErrorService {
    hasError = new EventEmitter<Error>() ;

    handleError(error: any) {
        console.log(error);
        const errorData = new Error(error.error.title,error.error.message);
        this.hasError.emit(errorData);
    }
}