import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token = localStorage.getItem('idToken'); // Token de locastorage
    if (token) {
    // Clonem la petició i afegiem el sifix
    //const authReq = req.clone({headers: req.headers.set('Authorization', token)});
    const authReq = req.clone({
      url: req.url.concat(`?auth=${token}`)
    });

    // Enviem la petició en token
    return next.handle(authReq);
    }
    return next.handle(req); // Sense tokens enviem la peticoó original
  }

}
