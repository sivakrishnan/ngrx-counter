import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";
import { AppState } from "../../store/app.store";
import { Store } from "@ngrx/store";
import { setLoadingSpinner } from "../../store/Shared/shared.actions";

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    constructor(private authService: AuthService, private store: Store<AppState>) {
    }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action: any) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const user = this.authService.formatUser(data);
                        return loginSuccess({ user });
                    })
                )
            })
        )
    })
}