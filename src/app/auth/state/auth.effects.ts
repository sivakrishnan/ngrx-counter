import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class AuthEffects {

    constructor(private authService: AuthService) {

    }

    private actions$ = inject(Actions);
    
    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action: any) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data: any) => {
                        return loginSuccess();
                    })
                ) 
            })
        )
    })
}