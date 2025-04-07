import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { counterReducer } from './counter/state/counter.reducer';
import { postsReducer } from './posts/state/posts.reducer';
import { POST_STATE_NAME } from './posts/state/posts.selectors';
import { COUNTER_STATE_NAME } from './counter/state/counter.selectors';

import { SignupComponent } from './auth/signup/signup.component';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './posts/state/post.effects';
import { AuthGuard } from './guard/auth.guard';

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
        canActivate: [AuthGuard],
        providers: [
            importProvidersFrom(StoreModule.forFeature(POST_STATE_NAME, postsReducer),
                EffectsModule.forFeature([PostsEffects]),
            ),
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
        path: 'auth',
        // providers: [
        //     importProvidersFrom(
        //         EffectsModule.forFeature([AuthEffects]),
        //         StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)
        //     ),
        // ],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent),
            },
            {
                path: 'signup',
                component: SignupComponent,

            },
        ]
    }
];
