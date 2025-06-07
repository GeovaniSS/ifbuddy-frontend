import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subscription, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../shared/services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const loadingSubscription: Subscription = timer(1000).subscribe(() => {
      this.loadingService.show();
    });

    return next.handle(request).pipe(
      finalize(() => {
        loadingSubscription.unsubscribe();
        this.loadingService.hide();
      }),
    );
  }
}
