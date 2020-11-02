import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize } from 'rxjs/operators';
import {SpinnerOverlayService} from '../services/spinner-overlay.service';



@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerOverlayService: SpinnerOverlayService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    const apiReq = req.clone({ url: `${environment.apiUrl}${req.url}`, withCredentials: true });
    return next.handle(apiReq).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }
}
