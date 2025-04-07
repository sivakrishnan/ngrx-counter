import { exhaustMap, take } from 'rxjs/operators';
import { getToken } from './../auth/state/auth.selector';
import { Store } from '@ngrx/store';
import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.store';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    private store = inject(Store<AppState>);

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(
            take(1),
            exhaustMap((token) => {
                if (!token) {
                    return next.handle(req);
                }
                let modifiedReq = req.clone({
                    params: req.params.append('auth', token),
                });
                return next.handle(modifiedReq);
            })
        );
    }
}