import { counterReducer } from "../counter/state/counter.reducer";
import { postsReducer } from "../posts/state/posts.reducer";
import { SharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";


export const appReducer = {
    // counter: counterReducer,
    // posts: postsReducer,
    [SHARED_STATE_NAME]: SharedReducer,
}