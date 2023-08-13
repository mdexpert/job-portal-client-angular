import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor ,HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = request.clone({
      headers: request.headers
      .set('Access-Control-Allow-Origin', '*')
      .set("Access-Control-Allow-Method","GET,HEAD,PUT,PATCH,POST,DELETE")
    });  
    //console.log('Intercepted HTTP call', authReq);
  
    return next.handle(authReq);
  }
}
