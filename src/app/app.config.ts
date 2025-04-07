import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpInterceptor, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { AuthReducer } from './auth/state/auth.reducer';
import { AuthTokenInterceptor } from './interceptor/AuthToken.interceptor';
import { SHARED_STATE_NAME } from './store/Shared/shared.selector';
import { SharedReducer } from './store/Shared/shared.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(routes),
    provideStore(),
    provideEffects(),
    importProvidersFrom(StoreModule.forRoot(appReducer),
      AuthTokenInterceptor,
      EffectsModule.forRoot([AuthEffects]),
      ReactiveFormsModule,
      StoreModule.forRoot(
        {
          [AUTH_STATE_NAME]: AuthReducer,
          [SHARED_STATE_NAME]: SharedReducer,
        }
      ),
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
