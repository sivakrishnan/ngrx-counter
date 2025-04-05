import { Post } from "../../models/state/posts.model";

export interface PostsState {
    posts: Post[] ;
}


export const initialState: PostsState = {
    // video 35  loaded from firebase
    // posts: [        
    //     { id: '1', title: 'Sample Title 1', description: 'Sample Description 1' },
    //     { id: '2', title: 'Sample Title 2', description: 'Sample Description 2' }
    // ]
    posts: [],
};