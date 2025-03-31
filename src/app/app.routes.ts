import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { counterReducer } from './counter/state/counter.reducer';
import { postsReducer } from './posts/state/posts.reducer';
import { POST_STATE_NAME } from './posts/state/posts.selectors';
import { COUNTER_STATE_NAME } from './counter/state/counter.selectors';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import { AuthReducer } from './auth/state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'counter',
        loadComponent: () => import('./counter/counter/counter.component').then((c) => c.CounterComponent),
        providers: [
            importProvidersFrom(StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)),
        ],
    },
    // {
    //     path: 'posts',
    //     component: PostsListComponent,
    //     children: [
    //         { path: 'add', component: AddPostComponent },
    //         { path: 'edit/:id', component: EditPostComponent }
    //     ]
    // }
    {
        path: 'posts',
        loadComponent: () => import('./posts/posts-list/posts-list.component').then((c) => c.PostsListComponent),
        providers: [
            importProvidersFrom(StoreModule.forFeature(POST_STATE_NAME, postsReducer)),
        ],
        children: [
            {
                path: 'add',
                loadComponent: () => import('./posts/add-post/add-post.component').then(c => c.AddPostComponent),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./posts/edit-post/edit-post.component').then(c => c.EditPostComponent),
            }
        ]
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent),
        providers: [
            importProvidersFrom(
                EffectsModule.forFeature([AuthEffects]),
                StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)
            ),
        ],
    }
];
