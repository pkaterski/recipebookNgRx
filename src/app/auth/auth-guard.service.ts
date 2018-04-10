import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from '../shared/store/app.reducers';
import * as fromAuth from './store/auth.reducers';

import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .take(1)
            .map(
                (authState: fromAuth.State) => {
                    if (!authState.authenticated) alert('Plase log in')
                    return authState.authenticated;
                }
            );
    }
}