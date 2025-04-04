import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { AppState } from "../../store/app.store";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "../../store/Shared/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private router = inject(Router);
    constructor(private authService: AuthService, private store: Store<AppState>) {
    }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action: any) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        return loginSuccess({ user });
                    }),
                    catchError((errResp: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        )
    });

    loginRedirect$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loginSuccess),
                tap((action) => {
                    this.router.navigate(['/']);
                })
            );
        },
        { dispatch: false }
    );
}