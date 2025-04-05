import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AppState } from "../../store/app.store";
import { Store } from "@ngrx/store";
import { setErrorMessage, setLoadingSpinner } from "../../store/Shared/shared.actions";
import { Router } from "@angular/router";
import { User } from "../../models/applicaitonModels/User.model";

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
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user, redirect: true });
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
                ofType(...[loginSuccess, signupSuccess]),
                tap((action) => {
                    this.store.dispatch(setErrorMessage({ message: '' }));
                    if (action.redirect) {
                        this.router.navigate(['/']);
                    }
                })
            );
        },
        { dispatch: false }
    );

    // signUpRedirect$ = createEffect(
    //     () => {
    //         return this.actions$.pipe(
    //             ofType(signupSuccess),
    //             tap((action) => {
    //                 this.store.dispatch(setErrorMessage({ message: '' }));
    //                 this.router.navigate(['/']);
    //             })
    //         );
    //     },
    //     { dispatch: false }
    // );

    signUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authService.signUp(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return signupSuccess({ user, redirect: true });
                    }),
                    catchError((errResp: any) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        );
    });


    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage();
                console.log(user);
                if (user)
                    return of(loginSuccess({ user, redirect: false }));
                else
                    return of();
            })
        );
    });

    logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(autoLogout),
                map((action) => {
                    this.authService.logout();
                    this.router.navigate(['auth/login']);
                })
            );
        },
        { dispatch: false }
    )
}