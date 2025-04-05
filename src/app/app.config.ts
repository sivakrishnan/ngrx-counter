import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { AuthReducer } from './auth/state/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    importProvidersFrom(StoreModule.forRoot(appReducer),
      EffectsModule.forRoot([AuthEffects]),
      ReactiveFormsModule,
      StoreModule.forRoot({[AUTH_STATE_NAME]: AuthReducer}),
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
