import { createReducer, on } from "@ngrx/store";
import { addPost, deletePost, updatePost } from "./posts.action";
import { initialState } from "./posts.state";
import { Post } from "../../models/state/posts.model";



const _postsReducer = createReducer(initialState,
    on(addPost, (state: any, action: any) => {
        let post = { ...action.post };
        post.id = (state.posts.length + 1).toString();

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state: any, action: any) => {
        const updatedPost = state.posts.map((post: Post) => {
            return action.post.id === post.id ? action.post : post;
        })

        return {
            ...state,
            posts: updatedPost
        }
    }),
    on(deletePost, (state: any, action: any) => {
        const remainingPosts = state.posts.filter((post: Post) => {
            return post.id !== action.id;
        })

        return {
            ...state,
            posts: remainingPosts
        }
    })
)

export function postsReducer(state: any, action: any) {
    return _postsReducer(state, action);
}