import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../shared/store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // intersept every request by adding the token to it

        // map wraps the return value in an observable
        // switchmap returns the exact value (which is already an observable)
        return this.store.select('auth')
        .take(1)
        .switchMap(
            (authState: fromAuth.State) => {
                const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
                return next.handle(copiedReq);
            }
        );
    }
}