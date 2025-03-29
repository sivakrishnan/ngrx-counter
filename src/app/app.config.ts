import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './store/app.reducer';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(StoreModule.forRoot(appReducer), ReactiveFormsModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
