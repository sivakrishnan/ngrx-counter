import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { AppState } from "../store/app.store";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "../auth/state/auth.selector";


@Injectable(
    { providedIn: 'root' }
)

export class AuthGuard implements CanActivate {

    private store = inject(Store<AppState>);
    private route = inject(Router);
    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.store.select(isAuthenticated).pipe(
            map((authenticate) => {
                if (!authenticate) {
                    return this.route.createUrlTree(['auth/login']);
                }
                return true;
            })
        );
    }
}