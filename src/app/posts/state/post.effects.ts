import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "../../services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.action";
import { map, mergeMap, switchMap } from "rxjs";

@Injectable()
export class PostsEffects {

    private actions$ = inject(Actions);
    private router = inject(Router);
    constructor(private postsService: PostsService) {

    }


    loadPosts$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(loadPosts),
                mergeMap((data) => {
                    return this.postsService.getPosts().pipe(
                        map((posts) => {
                            console.log(data);
                            return loadPostsSuccess({ posts });
                        })
                    );
                })
            )
        }
    );

    addPost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap(action => {
                return this.postsService.addPost(action.post).pipe(
                    map((data) => {
                        console.log(data);
                        const post = { ...action.post, id: data.name };
                        return addPostSuccess({ post });
                    })
                );
            })
        );
    });

    updatePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postsService.updatePost(action.post).pipe(
                    map((data) => {
                        return updatePostSuccess({ post: action.post });
                    })
                );
            })
        )
    });

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postsService.deletePost(action.id).pipe(
                    map((data) => {
                        return deletePostSuccess({ id: action.id });
                    })
                );
            })
        )
    });

}